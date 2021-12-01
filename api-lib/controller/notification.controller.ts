import "@/api-lib/models/notificationModel";
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { acceptGithubUserInvite, getGithubId, sendGithubUserInvite } from "@/api-lib/utils/github";
import { getCurrentUser, validateError } from "@/api-lib/utils";
import { findUser, updateUser } from "@/api-lib/service/user.service";
import { findProject, updateProject } from "@/api-lib/service/project.service";
import { findProjectRequestFromUser, 
  findProjectRequest, 
  createProjectRequest, 
  createProjectResponse, 
  updateProjectRequest } from "@/api-lib/service/notification.service";
import { NotificationDocument } from "@/api-lib/models/notificationModel";
import { ClientError } from "./defaultMessages";


export const createProjectRequestHandler = async(req: NextApiRequest, res: NextApiResponse) =>{
  const githubId = await getGithubId(req);
  const projectId = req.query["projectid"];

  try {
    const currentUser = githubId? await getCurrentUser(githubId) : null;

    if ( !currentUser ) {
      return res.status(403).json(ClientError()[403]);
    }

    const requestedProject = projectId? await findProject({ projectId }, { lean: false }) : null;
  
    if ( !requestedProject ) {
      return res.status(404).json(ClientError("Project requested not found.")[404]);
    }

    if ( requestedProject.projectOwner.equals(currentUser._id ) ) {
      return res.status(409).json(ClientError("Can't send request to owned project.")[409]);
    }

    const checkUserIfAlreadyMember = requestedProject.projectMembers.find(member => member.equals(currentUser._id));

    if ( checkUserIfAlreadyMember ) {
      return res.status(409).json(ClientError("Already a member to requested project")[409]);
    }

    const projectOwner = await findUser({ _id: requestedProject.projectOwner }, { lean: false });
    const checkNotificationExistence =  await findProjectRequestFromUser(projectOwner, currentUser, requestedProject);
    
    if ( checkNotificationExistence && !checkNotificationExistence.responded ) {
      return res.status(409).json(ClientError("Request to project already created. Wait for response.")[409]);
    }
  
    const requestInformation: NotificationDocument = {
      ...req.body,
      requester: currentUser._id,
      project: requestedProject._id,
      notificationType: "request",
      responded: false,
      notificationId: nanoid(15)
    }
  
    const createdRequest = await createProjectRequest(requestInformation);
    
    await updateUser({_id: projectOwner._id}, {$push: { notifications: createdRequest._id }});
    
    return res.status(201).json({message:"Request for project successful."});
  } catch( error ){
    validateError(error, 400, res);
  } 
}

interface ResponseBody {
  accepted: boolean,
  message: string
}

export const respondProjectRequestHandler = async(req: NextApiRequest,res: NextApiResponse) =>{
  const githubId = await getGithubId(req);
  const notificationId = req.query["notificationId"];
  const responseBody: ResponseBody = {...req.body};

  try {
    const currentUser = githubId? await getCurrentUser(githubId) : null;

    if ( !currentUser ) return res.status(403).json({message: "Forbidden. Create your account properly."});

    const requestNotification = notificationId? await findProjectRequest({ notificationId }, { lean: false } ) : null;

    if ( !requestNotification ) return res.status(404).json({message:"Project request not found. Can't respond"});

    if ( requestNotification.responded ) return res.status(409).json({message:"Already responded to request."});
    
    await currentUser.populate("notifications");

    const checkNotificationExistenceInUser = currentUser.notifications?.find(notif =>notif.requester.equals(requestNotification.requester));
    
    if ( !checkNotificationExistenceInUser ) return res.status(403).json({message:"Can't respond to not owned project request."});

    const responseInformation: NotificationDocument = {
      ...responseBody,
      responder: currentUser._id,
      project: requestNotification.project,
      notificationType: "response",
      position: requestNotification.position,
    }

    const updatedRequestInformation = {
      accepted: responseBody.accepted,
      responded: true
    }

    await requestNotification.populate("requester project");

    const githubInviteInformation = {
      username: requestNotification.requester.githubUsername,
      repo: requestNotification.project.projectName
    }

    const githubInviteId = await sendGithubUserInvite(currentUser, githubInviteInformation);

    // Send github collaborator request
    await acceptGithubUserInvite(requestNotification.requester, githubInviteId);

    // Accept the github request from above
    await updateProjectRequest({ notificationId: requestNotification.notificationId }, updatedRequestInformation);

    const responseNotification = await createProjectResponse(responseInformation);

    await updateUser({_id: requestNotification.requester._id}, { $push: { notifications: responseNotification._id}});

    await updateProject({_id: requestNotification.project._id}, {$push: {projectMembers: requestNotification.requester._id}});

    return res.status(201).json({message:"Responded successfully."});
   } catch( error ) {
    validateError(error, 400, res);
  }
}

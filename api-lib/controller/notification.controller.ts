import "@/api-lib/models/notificationModel";
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { acceptGithubUserInvite, getGithubId, sendGithubUserInvite } from "@/api-lib/utils/github";
import { getCurrentUser } from "@/api-lib/utils";
import { findUser, updateUser } from "@/api-lib/service/user.service";
import { findProject, updateProject } from "@/api-lib/service/project.service";
import { findProjectRequestFromUser, 
  findProjectRequest, 
  createProjectRequest, 
  createProjectResponse, 
  updateProjectRequest } from "@/api-lib/service/notification.service";
import { NotificationDocument } from "@/api-lib/models/notificationModel";
import { ClientError, validateError } from "@/api-lib/utils/errors";


export const createProjectRequestHandler = async(req: NextApiRequest, res: NextApiResponse) =>{
  const githubId = await getGithubId(req);
  const projectId = req.query["projectid"];

  try {
    const currentUser = githubId? await getCurrentUser(githubId) : null;

    if ( !currentUser ) {
      return ClientError(res, 403);
    }

    const requestedProject = projectId? await findProject({ projectId }, { lean: false }) : null;
  
    if ( !requestedProject ) {
      return ClientError(res, 404, "Project requested not found.");
    }

    if ( requestedProject.projectOwner.equals(currentUser._id ) ) {
      return ClientError(res, 409, "Can't send request to owned project.");
    }

    const checkUserIfAlreadyMember = requestedProject.projectMembers.find(member => member.equals(currentUser._id));

    if ( checkUserIfAlreadyMember ) {
      return ClientError(res, 409, "Already a member to requested project")
    }

    const projectOwner = await findUser({ _id: requestedProject.projectOwner }, { lean: false });
    const checkNotificationExistence =  await findProjectRequestFromUser(projectOwner, currentUser, requestedProject);
    
    if ( checkNotificationExistence && !checkNotificationExistence.responded ) {
      return ClientError(res, 409, "Request to project already created. Wait for response.");
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

    if ( !currentUser ) {
      return ClientError(res, 403);
    }

    const requestNotification = notificationId? await findProjectRequest({ notificationId }, { lean: false } ) : null;

    if ( !requestNotification ) {
      return ClientError(res, 404, "Project request not found. Can't respond.");

    }
    if ( requestNotification.responded ) {
      return ClientError(res, 409, "Already responded to request.");
    }
    
    await currentUser.populate("notifications");

    const checkNotificationExistenceInUser = currentUser.notifications?.find(notif =>notif.requester.equals(requestNotification.requester));
    
    if ( !checkNotificationExistenceInUser ) {
      return ClientError(res, 404, "Notification not found in user's notifications list.")
    }

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

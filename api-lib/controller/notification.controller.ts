import "@/api-lib/models/notificationModel";
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { getGithubId, 
  getCurrentUser, 
  getProperty, 
  validateError } from "@/api-lib/utils";
import { findUser, updateUser } from "@/api-lib/service/user.service";
import { findProject, updateProject } from "@/api-lib/service/project.service";
import { findProjectRequestFromUser, 
  findProjectRequest, 
  createProjectRequest, 
  createProjectResponse, 
  updateProjectRequest } from "@/api-lib/service/notification.service";


interface RequestQuery {
  projectId?: string,
}

export const createProjectRequestHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);
  const requestQuery: RequestQuery = req.query;
  const projectId = getProperty(requestQuery, "projectId");

  try {
    const currentUser = githubId? await getCurrentUser(githubId, res) : null;

    if ( currentUser ) {
      const requestedProject = projectId? await findProject({ projectId }, { lean: false }) : null;
  
      if ( !requestedProject ) return res.status(404).send("Project requested not found.");

      if ( requestedProject.projectOwner.equals(currentUser._id ) ) return res.status(409).send("Can't send request to owned project.");

      const projectOwner = await findUser({ _id: requestedProject.projectOwner }, { lean: false });
      const checkNotificationExistence =  await findProjectRequestFromUser(projectOwner, currentUser, requestedProject);
      
      if ( checkNotificationExistence &&
         !checkNotificationExistence.responded ) return res.status(409).send("Request to project already created. Wait for response.");
  
      const requestInformation = {
        ...req.body,
        requester: currentUser._id,
        project: requestedProject._id,
        notificationType: "request",
        responded: false,
        notificationId: nanoid(15)
      }
  
      const createdRequest = await createProjectRequest(requestInformation);
      
      await updateUser({_id: projectOwner._id}, {$push: { notifications: createdRequest._id }});
      
      return res.status(200).send("Request for project successful.");
    }
  } catch( error ){
    validateError(error, 400, res);
  } 
}

interface ResponseQuery {
  notificationId?: string
}

interface ResponseBody {
  accepted: boolean,
  message: string
}

export const respondProjectRequestHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);
  const responseQuery: ResponseQuery = req.query;
  const notificationId = getProperty(responseQuery, "notificationId");
  const responseBody: ResponseBody = {...req.body};

  try {
    const currentUser = githubId? await getCurrentUser(githubId, res) : null;

    if ( currentUser ) {
      const requestNotification = notificationId? await findProjectRequest({ notificationId }, { lean: false } ) : null;

      if ( !requestNotification ) return res.status(404).send("Project request not found. Can't respond");

      if ( requestNotification.responded ) return res.status(409).send("Already responded to request.");
      
      await currentUser.populate("notifications");

      const checkNotificationExistenceInUser = currentUser.notifications?.find(notif =>notif.requester.equals(requestNotification.requester));
      
      if ( !checkNotificationExistenceInUser ) return res.status(403).send("Can't respond to not owned project request.");

      const responseInformation = {
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

      await updateProjectRequest({ notificationId: requestNotification.notificationId }, updatedRequestInformation);

      const responseNotification = await createProjectResponse(responseInformation);

      await updateUser({_id: requestNotification.requester}, { $push: { notifications: responseNotification._id}});

      await updateProject({_id: requestNotification.project}, {$push: {projectMembers: requestNotification.requester}});

      return res.status(200).send("Responded successfully.");
    }
   } catch( error ) {
    validateError(error, 400, res);
  }
}

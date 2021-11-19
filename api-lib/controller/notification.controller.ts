import { NextApiRequest, NextApiResponse } from "next";
import { getGithubId, getProperty } from "@/api-lib/utils";
import { findUser } from "@/api-lib/service/user.service";
import { findProject } from "@/api-lib/service/project.service";
import { nanoid } from "nanoid";
import { findProjectRequest, createProjectRequest, createProjectResponse } from "@/api-lib/service/notification.service";
import { validateError } from "@/api-lib/utils";
import { NotificationDocument } from "../models/notificationModel";


interface RequestQuery {
  projectId?: string[],
}

export const createProjectRequestHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);
  const requestQuery: RequestQuery = req.query;
  const projectId = getProperty(requestQuery, "projectId");

  try {
    if ( !githubId ) return res.status(401).send("User must be signed in.");

    const currentUser = await findUser({ githubId }, { lean: false });
    
    if ( !currentUser ) return res.status(403).send("Forbidden. Create your account properly.");

    const requestedProject = projectId? await findProject({ projectId: projectId[0] }, { lean: false }) : null;

    if ( !requestedProject ) return res.status(404).send("Project requested not found.");

    const projectOwner = await findUser({ _id: requestedProject.projectOwner }, { lean: false });
    const checkNotificationExistence =  await findProjectRequest(projectOwner, currentUser, requestedProject);

    if ( checkNotificationExistence && !checkNotificationExistence.responded ) return res.status(409).send("Request to project already created. Wait for response.");

    const requestInformation = {
      requester: currentUser._id,
      project: requestedProject._id,
      ...req.body,
      notificationType: "request",
      responded: false,
      notificationId: nanoid(15)
    }

    await createProjectRequest(requestInformation, projectOwner);
    
    return res.status(200).send("Request for project successful.");
  } catch( error ){
    validateError(error, 400, res);
  } 
}

interface ResponseQuery {
  requesterId?: string[],
  projectId?: string
}

export const respondProjectRequest = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);
  const responseQuery: ResponseQuery = req.query;
  const requesterId = getProperty(responseQuery, "requesterId");
  const projectId = getProperty(responseQuery, "projectId");
  
  try {
    if ( !githubId ) return res.status(401).send("User must be signed in.");

    const currentUser = await findUser({ githubId }, { lean: false });
    
    if ( !currentUser ) return res.status(403).send("Forbidden. Create your account properly.");

    const requestedProject = projectId? await findProject({ projectId: projectId }, { lean: false }) : null;
    console.log(requestedProject);
    if ( !requestedProject ) return res.status(404).send("Can't respond to missing project.");

    const requester = requesterId? await findUser({ githubId: requesterId[0] }, { lean: false }) : null;

    if ( !requester ) return res.status(404).send("Requester to project not found.");

    const requestNotification = await findProjectRequest(currentUser, requester, requestedProject);

    if ( !requestNotification ) return res.status(404).send("Project request not found. Can't respond.");

    if ( requestNotification.responded ) return res.status(400).send("Already responded to request.");

    const responseInformation: NotificationDocument = {
      responder: currentUser._id,
      project: requestedProject._id,
      ...req.body,
      notificationType: "response",
      notificationId: nanoid(15)
    }

    await createProjectResponse(responseInformation, requester);

    return res.status(200).send("Response to project request created.");
   } catch( error ) {
    validateError(error, 400, res);
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { getGithubIdSession, getProperty } from "@/api-lib/utils";
import { findUser } from "@/api-lib/service/user.service";
import { findProject } from "@/api-lib/service/project.service";
import { createNotification } from "@/api-lib/service/notification.service";
import { validateError } from "@/api-lib/utils";


interface RequestQuery {
  projectId?: string,
  userId?: string[]
}

export const createNotificationHandler = ( response: String ) => async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubIdSession(req);
  const requestQuery: RequestQuery = req.query;
  const userId = getProperty(requestQuery, "userId");

  try {
    if ( !githubId ) return res.status(401).send("User must be signed in.");

    const currentUser = await findUser({ githubId }, { lean: false });
    
    if ( !currentUser ) return res.status(403).send("Forbidden. Create your account properly.");

    const requestedProjectOwner = userId? await findUser({ githubId: userId[0] }, { lean: false }) : null;
    
    if ( !requestedProjectOwner ) return res.status(404).send("Project owner not found.");

    if ( githubId===requestedProjectOwner.githubId ) return res.status(409).send("Cannot send request for the same user.");

    const requestedProject = await findProject({ projectId: getProperty(requestQuery, "projectId") }, { lean: false });

    if ( !requestedProject ) return res.status(404).send("Project requested not found.");

    const notificationInfo = {
      ...req.body,
      notificationType: "request",
      requester: currentUser._id
    }

    await createNotification(notificationInfo, requestedProjectOwner);
    
    return res.status(200).send("Request for project successful.");
  } catch( error ){
    validateError(error, 400, res);
  } 
}

export const getNotificationsHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubIdSession(req);

  try {
    if ( !githubId ) return res.status(401).send("User must be signed in.");
    
    const currentUser = await findUser({ githubId }, { lean: false });

    if ( !currentUser ) return res.status(403).send("Forbidden. Create your account properly");

    const notificationsOptions = {
      populationPath: "notifications",
      populationMembers: "-_id username githubId"
    }
    await currentUser.populate({
      path: notificationsOptions.populationPath,
      populate: {
        path: "requester",
        select: notificationsOptions.populationMembers
      }
    });

    return res.status(200).json(currentUser.notifications);
  } catch( error ){
    validateError(error, 400, res);
  }
}
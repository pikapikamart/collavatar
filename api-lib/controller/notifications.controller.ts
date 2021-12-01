import "@/api-lib/models/notificationModel";
import { NextApiRequest, NextApiResponse } from "next";
import { getGithubId } from "@/api-lib/utils/github";
import { getCurrentUser, validateError } from "@/api-lib/utils";
import { ClientError } from "./defaultMessages";


export const getNotificationsHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);

  try {
    const currentUser = githubId? await getCurrentUser(githubId) : null;

    if ( !currentUser ) {
      return res.status(403).json(ClientError()[403]);
    }

    const notificationsOptions = {
      populationPath: "notifications",
      populationMembers: "-_id username githubId"
    }
    
    await currentUser.populate({
      path: notificationsOptions.populationPath,
      populate: {
        path: "requester responder",
        select: notificationsOptions.populationMembers
      }
    });

    return res.status(200).json({notification:currentUser.notifications});      
  } catch( error ){
    validateError(error, 400, res);
  }
}
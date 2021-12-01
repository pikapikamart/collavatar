import "@/api-lib/models/notificationModel";
import { NextApiRequest, NextApiResponse } from "next";
import { getGithubId } from "@/api-lib/utils/github";
import { getCurrentUser } from "@/api-lib/utils";
import { ClientError, validateError } from "@/api-lib/utils/errors";
import { ClientSuccess } from "@/api-lib/utils/success";


export const getNotificationsHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);

  try {
    const currentUser = githubId? await getCurrentUser(githubId) : null;

    if ( !currentUser ) {
      return ClientError(res, 403);
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

    return ClientSuccess(res, 200, "", currentUser.notifications);
  } catch( error ){
    validateError(error, 400, res);
  }
}
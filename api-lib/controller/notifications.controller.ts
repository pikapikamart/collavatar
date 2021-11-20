import "@/api-lib/models/notificationModel";
import { NextApiRequest, NextApiResponse } from "next";
import { getCurrentUser, getGithubId, validateError } from "@/api-lib/utils";


export const getNotificationsHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);

  try {
    const currentUser = githubId? await getCurrentUser(githubId, res) : null;

    if ( currentUser ){
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

      return res.status(200).json(currentUser.notifications);      
    }
  } catch( error ){
    validateError(error, 400, res);
  }
}
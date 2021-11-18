import { NextApiRequest, NextApiResponse } from "next";
import { getGithubIdSession, validateError } from "@/api-lib/utils";
import { findUser } from "@/api-lib/service/user.service";
import { NotificationModel } from "@/api-lib/models/notificationModel";


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
        path: "requester responder",
        select: notificationsOptions.populationMembers,
        model: "User"
      }
    });
    console.log(currentUser);

    // await currentUser.populate("notifications");

    return res.status(200).json(currentUser.notifications);
  } catch( error ){
    validateError(error, 400, res);
  }
}
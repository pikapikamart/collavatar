import { RequestNotification, RequestNotificationDocument } from "@/api-lib/models/requestNotification"
import { CollavatarUserDocument } from "@/api-lib/models/collavatarUser";
import { Error } from "mongoose";


export const createProjectRequest = async(
  requestBody: RequestNotificationDocument,
  projectOwner: CollavatarUserDocument
) =>{
  try {
    const notification: RequestNotificationDocument = await RequestNotification.create(requestBody);
    // Save notification to the project owner
    projectOwner.notifications?.push(notification._id);
    await projectOwner.save();
    // End of Save notification to the project owner
  } catch( error ) {
    if ( error instanceof Error ) {
      throw new Error(error.message);
    }
  }
}

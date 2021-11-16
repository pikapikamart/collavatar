import { CollavatarNotificationDocument, CollavatarNotification } from "@/api-lib/models/collavatarNotification"
import { CollavatarUserDocument } from "@/api-lib/models/collavatarUser";
import { CollavatarProjectDocument } from "@/api-lib/models/collavatarProject";
import { Error } from "mongoose";


export const createNotification = async(
  notificationBody: CollavatarNotificationDocument,
  projectOwner: CollavatarUserDocument
) =>{
  try {
    const notification: CollavatarNotificationDocument = await CollavatarNotification.create(notificationBody);
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

export const getNotifications = async(

) =>{
  
}
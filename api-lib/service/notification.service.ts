import { NotificationDocument, NotificationModel } from "@/api-lib/models/notificationModel"
import { UserDocument } from "@/api-lib/models/userModel";
import { Error } from "mongoose";


export const findProjectRequest = async( 
  projectOwner: UserDocument,
  requester: UserDocument
): Promise<NotificationDocument> =>{
  await projectOwner.populate("notifications");
  const notifications = projectOwner.notifications;
  // Get the latest one
  const projectRequestExistence: NotificationDocument  = notifications?.slice().
  reverse().
  find(( notif: NotificationDocument ) =>(
    notif.requester.equals(requester._id) 
  ));

  return projectRequestExistence;
}


export const createProjectRequest = async(
  requestBody: NotificationDocument,
  projectOwner: UserDocument
) =>{
  try {
    const notification: NotificationDocument = await NotificationModel.create(requestBody);
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

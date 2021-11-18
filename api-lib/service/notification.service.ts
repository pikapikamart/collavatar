import { NotificationDocument, NotificationModel } from "@/api-lib/models/notificationModel"
import { UserDocument } from "@/api-lib/models/userModel";
import { ProjectDocument } from "@/api-lib/models/projectModel";
import { Error } from "mongoose";


export const findProjectRequest = async( 
  projectOwner: UserDocument,
  requester: UserDocument,
  requestedProject: ProjectDocument
): Promise<NotificationDocument> =>{
  await projectOwner.populate("notifications");
  const notifications = projectOwner.notifications;
  // Get the latest request for project from the notification array
  const projectRequestExistence: NotificationDocument  = notifications?.slice().
  reverse().
  find(( notif: NotificationDocument ) =>(
    notif.notificationType==="request" && 
    notif.requester.equals(requester._id) && 
    notif.project.equals(requestedProject._id)
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

export const updateProjectRequest = async (
  request: NotificationDocument,
  response: NotificationDocument
) =>{
  try {
    request.responded = true;
    request.accepted = response.accepted;
    await request.save();

  } catch( error ) {
    if ( error instanceof Error ) {
      throw new Error(error.message);
    }
  }
}

export const createProjectResponse = async(
  responseBody: NotificationDocument,
  requester: UserDocument,
) =>{
  try {
    const notification: NotificationDocument = await NotificationModel.create(responseBody);
    // Save notification to the requester
    requester.notifications?.push(notification._id);
    await requester.save();
    // End of Save notification to the requester
  } catch( error ) {
    if ( error instanceof Error ) {
      throw new Error(error.message);
    }
  }
}
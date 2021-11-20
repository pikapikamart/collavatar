import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { NotificationDocument, NotificationModel } from "@/api-lib/models/notificationModel"
import { UserDocument } from "@/api-lib/models/userModel";
import { ProjectDocument } from "@/api-lib/models/projectModel";


export const findProjectRequestFromUser = async( 
  projectOwner: UserDocument,
  requester: UserDocument,
  requestedProject: ProjectDocument
): Promise<NotificationDocument> =>{
  await projectOwner.populate("notifications");
  const notifications = projectOwner.notifications;
  // Get the latest request for project from the notification array
  const projectRequestExistence: NotificationDocument = notifications?.slice().
  reverse().
  find(( notif: NotificationDocument ) =>(
    notif.notificationType==="request" && 
    notif.requester.equals(requester._id) && 
    notif.project.equals(requestedProject._id)
  ));

  return projectRequestExistence;
}

export const findProjectRequest = async(
  query: FilterQuery<NotificationDocument>,
  options: QueryOptions = { lean: true }
): Promise<NotificationDocument> =>(
  NotificationModel.findOne(query, options)
)

export const createProjectRequest = async(
  requestBody: NotificationDocument
): Promise<NotificationDocument> =>(
  NotificationModel.create(requestBody)
)

export const updateProjectRequest = async (
  query: FilterQuery<NotificationDocument>,
  update: UpdateQuery<NotificationDocument>,
  options: QueryOptions = { lean: true }
)=>(
  NotificationModel.findOneAndUpdate(query, update, options)
)

export const createProjectResponse = async(
  responseBody: DocumentDefinition<NotificationDocument>
): Promise<NotificationDocument> => (
  NotificationModel.create(responseBody)
)
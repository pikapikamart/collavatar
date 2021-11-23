import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { NotificationModel, NotificationDocument, NotificationMongooseDocument  } from "@/api-lib/models/notificationModel"
import { UserMongooseDocument } from "@/api-lib/models/userModel";
import { ProjectMongooseDocument } from "@/api-lib/models/projectModel";


export const findProjectRequestFromUser = async( 
  projectOwner: UserMongooseDocument,
  requester: UserMongooseDocument,
  requestedProject: ProjectMongooseDocument
): Promise<NotificationMongooseDocument> =>{
  await projectOwner.populate("notifications");
  const notifications = projectOwner.notifications;
  // Get the latest request for project from the notification array
  const projectRequestExistence: NotificationMongooseDocument = notifications?.slice().
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
): Promise<NotificationMongooseDocument> =>(
  NotificationModel.findOne(query, options)
)

export const createProjectRequest = async(
  requestBody: NotificationDocument
): Promise<NotificationMongooseDocument> =>(
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
): Promise<NotificationMongooseDocument> => (
  NotificationModel.create(responseBody)
)
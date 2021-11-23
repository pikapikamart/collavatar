import mongoose from "mongoose";
import { UserMongooseDocument } from "@/api-lib/models/userModel";
import { ProjectMongooseDocument } from "@/api-lib/models/projectModel";


export interface NotificationMongooseDocument extends NotificationDocument, mongoose.Document {
  createdAt?: Date,
  updatedAt?: Date
}

export interface NotificationDocument {
  requester?: UserMongooseDocument["_id"],
  responder?: UserMongooseDocument["_id"],
  project?: ProjectMongooseDocument["_id"],
  notificationType: string,
  position: string,
  message: string,
  accepted?: boolean,
  responded?: boolean,
  notificationId?: string,
}

const notificationSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  responder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  notificationType: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  accepted: {
    type: Boolean
  },
  responded: {
    type: Boolean
  },
  notificationId: {
    type: String
  }
}, { timestamps: true }
);

const NotificationModel = mongoose.models?.Notification || mongoose.model<NotificationMongooseDocument>("Notification", notificationSchema);


export { NotificationModel };
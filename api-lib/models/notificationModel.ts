import mongoose from "mongoose";
import { UserDocument } from "@/api-lib/models/userModel";
import { ProjectDocument } from "@/api-lib/models/projectModel";


export interface NotificationDocument extends mongoose.Document {
  requester?: UserDocument["_id"],
  responder?: UserDocument["_id"],
  project?: ProjectDocument["_id"],
  notificationType: string,
  position: string,
  message: string,
  accepted?: Boolean,
  responded: Boolean,
  notificationId: string,
  createdAt: Date,
  updatedAt: Date
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
    type: Boolean,
    required: true
  },
  notificationId: {
    type: String,
    required: true
  }
}, { timestamps: true }
);

const NotificationModel = mongoose.models?.Notification || mongoose.model<NotificationDocument>("Notification", notificationSchema);


export { NotificationModel };
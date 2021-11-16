import mongoose from "mongoose";
import { CollavatarUserDocument } from "@/api-lib/models/collavatarUser";
import { CollavatarProjectDocument } from "@/api-lib/models/collavatarProject";


export interface RequestNotificationDocument extends mongoose.Document {
  requester: CollavatarUserDocument["_id"],
  project: CollavatarProjectDocument["_id"],
  position: string,
  message: string,
  createdAt: Date,
  updatedAt: Date
}

const requestNotificationSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CollavatarUser",
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CollavatarProject",
    required: true
  },
  position: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true }
);

const RequestNotification = mongoose.models?.CollavatarNotification || mongoose.model<RequestNotificationDocument>("RequestNotification", requestNotificationSchema);


export { RequestNotification };
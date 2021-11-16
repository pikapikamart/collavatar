import mongoose from "mongoose";
import { CollavatarUserDocument } from "@/api-lib/models/collavatarUser";


export interface CollavatarNotificationDocument extends mongoose.Document {
  requester: CollavatarUserDocument["_id"],
  position: string,
  message: string,
  notificationType: string,
  createdAt: Date,
  updatedAt: Date
}

const collavatarNotificationSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CollavatarUser"
  },
  position: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  notificationType: {
    type: String,
    required: true
  }
}, { timestamps: true }
);

const CollavatarNotification = mongoose.models?.CollavatarNotification || mongoose.model<CollavatarNotificationDocument>("CollavatarNotification", collavatarNotificationSchema);


export { CollavatarNotification };
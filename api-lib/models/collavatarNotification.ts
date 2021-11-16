import mongoose from "mongoose";


export interface CollavatarNotificationDocument {
  username: string,
  position: string,
  message: string,
  notification: string
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
  notification: {
    type: String,
    required: true
  }
});

const CollavatarNotification = mongoose.models?.CollavatarNotification || mongoose.model<CollavatarNotificationDocument>("CollavatarNotification", collavatarNotificationSchema);


export { CollavatarNotification };
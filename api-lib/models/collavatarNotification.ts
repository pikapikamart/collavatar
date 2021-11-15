import mongoose from "mongoose";

export interface CollavatarNotificationDocument {
  username: String,
  position: String,
  message: String,
  notification: String
}

const collavatarNotificationSchema = new mongoose.Schema({
  username: {
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
  notification: {
    type: String,
    required: true
  }
});


const CollavatarNotification = mongoose.models?.CollavatarNotification || mongoose.model<CollavatarNotificationDocument>("CollavatarNotification", collavatarNotificationSchema);

export { CollavatarNotification };
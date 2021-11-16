import mongoose from "mongoose";
import { CollavatarUserDocument } from "@/api-lib/models/collavatarUser";


export interface ResponseNotificationDocument extends mongoose.Document {
  responder: CollavatarUserDocument["_id"],
  createdAt: Date,
  updatedAt: Date
}

const responseNotificationSchema = new mongoose.Schema({
  responder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CollavatarUser",
    required: true
  },
  
}, { timestamps: true }
);

const ResponseNotification = mongoose.models?.ResponseNotification || mongoose.model<ResponseNotificationDocument>("ResponseNotification", responseNotificationSchema);

export { ResponseNotification };
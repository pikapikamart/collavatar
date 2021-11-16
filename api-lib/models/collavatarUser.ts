import mongoose from "mongoose";
import { CollavatarProjectDocument } from "./collavatarProject";
import { CollavatarNotificationDocument} from "./collavatarNotification";


export interface CollavatarUserDocument extends mongoose.Document {
  githubId: string,
  githubEmail: string,
  githubRepoLink: string,
  githubAccessToken: string,
  username: string,
  userBio?: string,
  userImage: string,
  createdAt: Date,
  updatedAt: Date,
  collaboratedProjects? : CollavatarProjectDocument["_id"][],
  ownedProjects?: CollavatarProjectDocument["_id"][],
  notifications?: CollavatarNotificationDocument["_id"][]
}

const collavatarUserSchema = new mongoose.Schema(
  {
    githubId: {
      type: String,
      required: true,
      unique: true
    },
    githubEmail: {
      type: String,
      required: true,
      unique: true
    },
    githubRepoLink: {
      type: String,
      required: true,
      unique: true
    },
    githubAccessToken: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true
    },
    userBio: {
      type: String,
      maxlength: 200
    },
    userImage: {
      type: String,
      required: true
    },
    collaboratedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollavatarProject"
      }
    ],
    ownedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollavatarProject"
      }
    ],
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollavatarNotification",
        default: []
      }
    ]
  },
  {
    timestamps: true
  }
);

const CollavatarUser = mongoose.models?.CollavatarUser || mongoose.model<CollavatarUserDocument>("CollavatarUser", collavatarUserSchema);


export { CollavatarUser };
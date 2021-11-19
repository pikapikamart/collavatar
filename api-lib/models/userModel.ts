import mongoose from "mongoose";
import { ProjectDocument } from "@/api-lib/models/projectModel";
import { NotificationDocument } from "@/api-lib/models/notificationModel";


export interface UserDocument extends mongoose.Document {
  githubId: string,
  githubEmail: string,
  githubRepoLink: string,
  githubAccessToken: string,
  username: string,
  userBio?: string,
  userImage: string,
  collaboratedProjects?: ProjectDocument["_id"][],
  ownedProjects?: ProjectDocument["_id"][],
  notifications?: NotificationDocument["_id"][]
  updatedAt?: Date,
  createdAt?: Date,
}

const userSchema = new mongoose.Schema(
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
        ref: "Project"
      }
    ],
    ownedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      }
    ],
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification"
      }
    ]
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.models?.User || mongoose.model<UserDocument>("User", userSchema);


export { UserModel };
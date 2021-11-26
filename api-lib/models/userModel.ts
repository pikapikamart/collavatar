import mongoose from "mongoose";
import { ProjectMongooseDocument } from "@/api-lib/models/projectModel";
import { NotificationMongooseDocument } from "@/api-lib/models/notificationModel";


export interface UserMongooseDocument extends UserDocument, mongoose.Document {
  createdAt: Date,
  updatedAt: Date
}

export interface UserDocument {
  githubId: string,
  githubEmail: string,
  githubRepoLink: string,
  githubAccessToken: string,
  githubUsername: string,
  username: string,
  userBio?: string,
  userImage: string,
  isDoneConfiguring?: boolean,
  collaboratedProjects?: ProjectMongooseDocument["_id"][],
  ownedProjects?: ProjectMongooseDocument["_id"][],
  notifications?: NotificationMongooseDocument["_id"][],
}

const userSchema = new mongoose.Schema({
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
  githubUsername: {
    type: String,
    required: true
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
  isDoneConfiguring: {
    type: String
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
  ],
}, {timestamps: true}
);

const UserModel = mongoose.models?.User || mongoose.model<UserMongooseDocument>("User", userSchema);


export { UserModel };
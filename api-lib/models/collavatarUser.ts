import mongoose from "mongoose";
import { CollavatarProjectITF } from "./collavatarProject";


export interface CollavatarUserITF extends mongoose.Document {
  githubId: string,
  githubEmail: string,
  githubRepoLink: string,
  githubAccessToken: string,
  username: string,
  userBio?: string,
  createdAt: Date,
  updatedAt: Date,
  collavProject? : CollavatarProjectITF[],
  ownedProject?: CollavatarProjectITF[]
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
    collavProject: [
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
    ]
  },
  {
    timestamps: true
  }
);


const CollavatarUser = mongoose.models?.CollavatarUser || mongoose.model<CollavatarUserITF>("CollavatarUser", collavatarUserSchema);


export { CollavatarUser };
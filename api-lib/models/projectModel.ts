import mongoose from "mongoose";
import { UserMongooseDocument } from "./userModel";


export interface ProjectMongooseDocument extends ProjectDocument, mongoose.Document {
  createdAt: Date,
  updatedAt: Date
}

export interface ProjectDocument{
  projectName: string,
  projectLink: string,
  projectLimitation: boolean,
  projectCapacity: number,
  projectTags: {
    tagName: string,
    needed: boolean}[],
  projectDescription: string,
  projectStatus: string,
  projectId: string,
  projectOwner: UserMongooseDocument["_id"],
  projectMembers: UserMongooseDocument["_id"][],
  createdAt?: Date,
  updatedAt?: Date
}

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  projectLink: {
    type: String,
    required: true
  },
  projectLimitation: {
    type: Boolean,
    required: true
  },
  projectCapacity: {
    type: Number,
    required: true,
    default: 0
  },
  projectTags: [
    {
    tagName: {type: String},
    needed: {type: Boolean}
  }],
  projectDescription: {
    type: String,
    required: true
  },
  projectId: {
    type: String,
    required: true
  },
  projectStatus: {
    type: String,
    required: true
  },
  projectOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  projectMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
}, { timestamps: true }
);

const ProjectModel = mongoose.models?.Project || mongoose.model<ProjectMongooseDocument>("Project", projectSchema);


export { ProjectModel };
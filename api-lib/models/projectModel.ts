import mongoose from "mongoose";
import { UserDocument } from "./userModel";


interface ProjectTags {
  tagName: string,
  needed: boolean
}

export interface ProjectDocument extends mongoose.Document {
  projectName: string,
  projectLink: string,
  projectLimitation: boolean,
  projectCapacity: number,
  projectTags: ProjectTags[],
  projectDescription: string,
  projectStatus: string,
  projectId: string,
  projectOwner: UserDocument["_id"],
  projectMembers: UserDocument["_id"][],
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
  projectTags: [{
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

const ProjectModel = mongoose.models?.Project || mongoose.model<ProjectDocument>("Project", projectSchema);


export { ProjectModel };
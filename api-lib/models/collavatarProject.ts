import mongoose from "mongoose";
import { CollavatarUserDocument } from "./collavatarUser";


interface ProjectTags {
  tagName: String,
  needed: Boolean
}

export interface CollavatarProjectDocument extends mongoose.Document {
  projectName: String,
  projectLink: String,
  projectLimitation: Boolean,
  projectCapacity: Number,
  projectTags: ProjectTags[],
  projectDescription: string
  projectStatus: String,
  projectId: String,
  projectOwner?: CollavatarUserDocument,
  projectMembers?: CollavatarUserDocument[],
}

const collavatarProjectSchema = new mongoose.Schema({
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
    ref: "CollavatarUser"
  },
  projectMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollavatarUser"
    }
  ],
});


const CollavatarProject = mongoose.models?.CollavatarProject || mongoose.model<CollavatarProjectDocument>("CollavatarProject", collavatarProjectSchema);


export { CollavatarProject };
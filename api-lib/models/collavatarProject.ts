import mongoose from "mongoose";
import { CollavatarUserITF } from "./collavatarUser";


export interface CollavatarProjectITF extends mongoose.Document {
  projectOwner: string,
  projectMembers?: CollavatarUserITF[],
  projectTags?: String[],
  projectStatus: string,
  projectCapacity: string | number,
  projectDescription: string
}

const collavatarProjectSchema = new mongoose.Schema({
  projectOwner: {
    type: String,
    required: true,
    unique: true
  },
  projectMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollavatarUser"
    }
  ],
  projectTags: [ String ],
  projectStatus: {
    type: String,
    required: true
  },
  projectCapacity: {
    type: String || Number,
    required: true
  },
  projectDescripion: {
    type: String,
    required: true
  }
});


const collavatarProject = mongoose.models?.CollavatarProject || mongoose.model<CollavatarProjectITF>("CollavatarProject", collavatarProjectSchema);


export { collavatarProject };
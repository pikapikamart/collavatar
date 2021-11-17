import { UserDocument } from "@/api-lib/models/userModel";
import { ProjectModel, ProjectDocument } from "@/api-lib/models/projectModel";
import { Error, FilterQuery, QueryOptions } from "mongoose";


export const createProject = async(
  projectInfo: ProjectDocument, 
  projectOwner: UserDocument
) =>{
  try {
    const newProject: ProjectDocument = await ProjectModel.create(projectInfo);
    // Save the project as the owned project of current user
    projectOwner.ownedProjects?.push(newProject._id);
    await projectOwner.save();
    // End of saving project as the owned project of current user
  } catch(error) {
    if ( error instanceof Error ) {
      throw new Error(error.message);
    }
  }
}

export const findProject = async(
  query: FilterQuery<ProjectDocument>,
  options: QueryOptions = { lean: true }
): Promise<ProjectDocument> =>{
  return ProjectModel.findOne(query, options);
}
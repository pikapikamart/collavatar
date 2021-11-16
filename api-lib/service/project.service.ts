import { CollavatarUserDocument } from "@/api-lib/models/collavatarUser"
import { CollavatarProject, CollavatarProjectDocument } from "@/api-lib/models/collavatarProject"
import { Error, FilterQuery, QueryOptions } from "mongoose";


export const createProject = async(
  projectInfo: CollavatarProjectDocument, 
  projectOwner: CollavatarUserDocument
) =>{
  try {
    const newProject: CollavatarProjectDocument = await CollavatarProject.create(projectInfo);
    // Save the currentUser as the owner and member of the project
    newProject.projectOwner = projectOwner._id;
    newProject.projectMembers?.push(projectOwner._id);
    await newProject.save();
    // End of saving currentUser as the owner and member of the project

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
  query: FilterQuery<CollavatarProjectDocument>,
  options: QueryOptions = { lean: true }
): Promise<CollavatarProjectDocument> =>{
  return CollavatarProject.findOne(query, options);
}
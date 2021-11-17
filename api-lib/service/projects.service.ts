import { ProjectModel, ProjectDocument } from "@/api-lib/models/projectModel";
import { QueryOptions } from "mongoose";


export const getProjects = async (
  projection: string, 
  populationPath: string, 
  populationMember: string,
  options: QueryOptions={lean: false}
) =>{
  const collavatarProjects: ProjectDocument[] =  await ProjectModel.find({}, projection, options)
  .populate(populationPath, populationMember);
  
  return collavatarProjects;
}
import { CollavatarProject, CollavatarProjectDocument } from "@/api-lib/models/collavatarProject";
import { QueryOptions } from "mongoose";


export const getProjects = async (
  projection: string, 
  populationPath: string, 
  populationMember: string,
  options: QueryOptions={lean: false}
) =>{
  const collavatarProjects: CollavatarProjectDocument[] =  await CollavatarProject.find({}, projection, options)
  .populate(populationPath, populationMember);
  
  return collavatarProjects;
}
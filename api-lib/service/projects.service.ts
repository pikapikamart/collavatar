import { CollavatarProject, CollavatarProjectDocument } from "../models/collavatarProject";
import { QueryOptions } from "mongoose";


export const getProjects = async (
  projection: String, 
  populationPath: String, 
  populationMember: String,
  options: QueryOptions={lean: false}) =>{
    const collavatarProjects: CollavatarProjectDocument[] =  await CollavatarProject.find({}, projection, options)
    .populate(populationPath, populationMember);
    
    return collavatarProjects;
}
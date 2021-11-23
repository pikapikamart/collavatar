import { ProjectModel, ProjectMongooseDocument } from "@/api-lib/models/projectModel";
import { QueryOptions } from "mongoose";


export const getProjects = async (
  projection: string, 
  populationPath: string, 
  populationMember: string,
  options: QueryOptions={ lean: true }
): Promise<ProjectMongooseDocument[]> =>(
  ProjectModel.find({}, projection, options).populate(populationPath, populationMember)
)
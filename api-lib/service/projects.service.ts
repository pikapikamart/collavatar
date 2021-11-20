import { ProjectModel, ProjectDocument } from "@/api-lib/models/projectModel";
import { QueryOptions } from "mongoose";


export const getProjects = async (
  projection: string, 
  populationPath: string, 
  populationMember: string,
  options: QueryOptions={ lean: true }
): Promise<ProjectDocument[]> =>(
  ProjectModel.find({}, projection, options).populate(populationPath, populationMember)
)
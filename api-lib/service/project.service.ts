import { FilterQuery, QueryOptions, DocumentDefinition, UpdateQuery } from "mongoose";
import { ProjectModel, ProjectDocument } from "@/api-lib/models/projectModel";


export const createProject = async(
  projectInfo: DocumentDefinition<ProjectDocument>
): Promise<ProjectDocument> =>(
  ProjectModel.create(projectInfo)
)

export const findProject = async(
  query: FilterQuery<ProjectDocument>,
  options: QueryOptions = { lean: true }
): Promise<ProjectDocument> =>(
  ProjectModel.findOne(query, options)
)

export const updateProject = async(
  query: FilterQuery<ProjectDocument>,
  update: UpdateQuery<ProjectDocument>
) =>{
  await ProjectModel.findOneAndUpdate(query, update);
}
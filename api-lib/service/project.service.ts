import { FilterQuery, QueryOptions, DocumentDefinition } from "mongoose";
import { ProjectModel, ProjectDocument } from "@/api-lib/models/projectModel";


export const createProject = async(
  projectInfo: DocumentDefinition<ProjectDocument>
): Promise<ProjectDocument> =>(
    await ProjectModel.create(projectInfo)
)

export const findProject = async(
  query: FilterQuery<ProjectDocument>,
  options: QueryOptions = { lean: true }
): Promise<ProjectDocument> =>(
  ProjectModel.findOne(query, options)
)
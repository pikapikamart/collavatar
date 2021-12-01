import "@/api-lib/models/projectModel";
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { validateError, getCurrentUser } from "@/api-lib/utils";
import { getGithubId, checkProjectInGithubUser } from "@/api-lib/utils/github";
import { ProjectDocument } from "@/api-lib/models/projectModel";
import { updateUser } from "@/api-lib/service/user.service";
import { createProject, findProject } from "@/api-lib/service/project.service";
import { ClientError } from "./defaultMessages";


export const createProjectHandler = async(req: NextApiRequest, res: NextApiResponse) =>{
  const githubId = await getGithubId(req);

  try {
    const currentUser = githubId? await getCurrentUser(githubId) : null;

    if ( !currentUser ) {
      return res.status(403).json(ClientError()[403]);
    }

    const newCollavProject: ProjectDocument = {
      ...req.body,
      projectId: nanoid(15),
      projectStatus: "Ongoing",
      projectOwner: currentUser._id,
      projectMembers: [currentUser._id]
    };
  
    const checkProjectExistence = await findProject({ projectName: newCollavProject.projectName, projectOwner: currentUser._id });

    if ( checkProjectExistence ) {
      return res.status(409).json(ClientError("Project already existed.")[409]);
    }
  
    const repositoryExistence = await checkProjectInGithubUser(currentUser.githubAccessToken, newCollavProject.projectName);

    if ( !repositoryExistence ) {
      return res.status(404).json(ClientError("Repository not found from github user.")[404]);
    }

    const createdProject = await createProject(newCollavProject);
    
    await updateUser({ githubId: currentUser.githubId }, { $push: { ownedProjects: createdProject._id}})
  
    return res.status(201).json("Project is successfully created.");
  } catch( error ) {
    validateError(error, 400, res)
  }
}



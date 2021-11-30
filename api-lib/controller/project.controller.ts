import "@/api-lib/models/projectModel";
import { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { getCurrentUser } from "@/api-lib/utils";
import { getGithubId, checkProjectInGithubUser } from "@/api-lib/utils/github";
import { ProjectDocument } from "@/api-lib/models/projectModel";
import { updateUser } from "@/api-lib/service/user.service";
import { createProject, findProject } from "@/api-lib/service/project.service";
import { ClientError, validateError } from "@/api-lib/utils/errors";


export const createProjectHandler = async(req: NextApiRequest, res: NextApiResponse) =>{
  const githubId = await getGithubId(req);

  try {
    const currentUser = githubId? await getCurrentUser(githubId) : null;

    if ( !currentUser ) {
      return ClientError(res, 403);
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
      return ClientError(res, 409, "Project already existed.")
    }
  
    const repositoryExistence = await checkProjectInGithubUser(currentUser.githubAccessToken, newCollavProject.projectName);

    if ( !repositoryExistence ) {
      return ClientError(res, 404, "Repository not found from github user.")
    }

    const createdProject = await createProject(newCollavProject);
    
    await updateUser({ githubId: currentUser.githubId }, { $push: { ownedProjects: createdProject._id}})
  
    return res.status(201).json("Project is successfully created.");
  } catch( error ) {
    validateError(error, 400, res)
  }
}



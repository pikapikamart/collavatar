import { NextApiRequest, NextApiResponse } from "next";
import { getGithubIdSession } from "@/api-lib/utils";
import { findUser } from "@/api-lib/service/user.service";
import { ProjectDocument } from "@/api-lib/models/projectModel";
import { nanoid } from "nanoid";
import { createProject, findProject } from "@/api-lib/service/project.service";
import { validateError } from "@/api-lib/utils";


export const createProjectHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubIdSession(req);

  try {
    if ( !githubId ) return res.status(401).send("User must be signed in.");

    const currentUser = await findUser({ githubId }, { lean: false });
  
    if ( !currentUser ) return res.status(403).send("Forbidden. Create your account properly.");
    
    const newCollavProject: ProjectDocument = {
      ...req.body,
      projectId: nanoid(15),
      projectStatus: "Ongoing",
      projectOwner: currentUser._id,
      projectMembers: [currentUser._id]
    };

    const checkProjectExistence = await findProject({ projectName: newCollavProject.projectName });

    if ( checkProjectExistence ) return res.status(409).send("Project already existed.");

    await createProject(newCollavProject, currentUser);
    
    return res.status(200).send("Project is successfully created.");

  } catch( error ) {
    validateError(error, 400, res)
  }
}

export const updateProjectHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubIdSession(req);

  try {

  } catch( error ){
    
  }
}


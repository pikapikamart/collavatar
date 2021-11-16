import { NextApiRequest, NextApiResponse } from "next";
import { getGithubIdSession } from "@/api-lib/utils";
import { findUser } from "@/api-lib/service/user.service";
import { nanoid } from "nanoid";
import { createProject } from "@/api-lib/service/project.service";
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
    
    const newCollavProject = {
      ...req.body,
      projectStatus: "Ongoing",
      projectId: nanoid(15)
    };
    
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


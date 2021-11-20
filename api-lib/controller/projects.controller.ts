import "@/api-lib/models/projectModel";
import { NextApiRequest, NextApiResponse } from "next";
import { getProjects } from "@/api-lib/service/projects.service";
import { getGithubId, validateError, getCurrentUser } from "@/api-lib/utils";


export const userProjectSelections = {
  collaborated: "collaboratedProjects",
  owned: "ownedProjects"
}

export const getUserProjects = (projectType: string) => async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);
  
  try {
    const currentUser = githubId? await getCurrentUser(githubId, res) : null;

    if ( currentUser ){
      if ( projectType==="ownedProjects"){} await currentUser.populate("ownedProjects");
  
      if ( projectType==="collaboratedProjects") await currentUser.populate("collaboratedProjects");
      
  
      return res.status(200).json(currentUser.get(projectType));
    }
  } catch( error ) {
    validateError(error, 400, res);
  }
}

export const getAllProjectsHandler = async( 
  req: NextApiRequest, 
  res: NextApiResponse 
) =>{
  try {
    const getProjectOptions = {
      projection: "-_id -projectMembers",
      populationPath: "projectOwner",
      populationMembers: "username userImage userBio githubId -_id"
    };
    const collavProjects = await getProjects(
      getProjectOptions.projection,
      getProjectOptions.populationPath,
      getProjectOptions.populationMembers);
    
      return res.status(200).json(collavProjects);
  } catch( error ) {
    validateError(error, 400, res);
  }
}


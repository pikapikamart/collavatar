import "@/api-lib/models/projectModel";
import { NextApiRequest, NextApiResponse } from "next";
import { getProjects } from "@/api-lib/service/projects.service";
import { getGithubId } from "@/api-lib/utils/github";
import { getCurrentUser } from "@/api-lib/utils";
import { ClientError, validateError } from "@/api-lib/utils/errors";
import { ClientSuccess } from "@/api-lib/utils/success";


export const getUserProjects = (projectType: "collaboratedProjects" | "ownedProjects") => async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);
  
  try {
    const currentUser = githubId? await getCurrentUser(githubId) : null;

    if ( !currentUser ) {
      return ClientError(res, 403);
    }

    if ( projectType==="ownedProjects") {
      await currentUser.populate("ownedProjects");
    } 
  
    if ( projectType==="collaboratedProjects") {
      await currentUser.populate("collaboratedProjects");
    }
    
    return ClientSuccess(res, 200, "", currentUser.get(projectType));
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
      projection: "-_id ",
      populationPath: "projectOwner",
      populationMembers: "username userImage userBio githubId -_id"
    };
  
    const collavProjects = await getProjects(
      getProjectOptions.projection,
      getProjectOptions.populationPath,
      getProjectOptions.populationMembers);

    return ClientSuccess(res, 200, "", collavProjects);
  } catch( error ) {
    validateError(error, 400, res);
  }
}


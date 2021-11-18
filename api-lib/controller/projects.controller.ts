import { NextApiRequest, NextApiResponse } from "next"
import { getProjects } from "@/api-lib/service/projects.service"
import { validateError } from "@/api-lib/utils";
import { getGithubIdSession } from "@/api-lib/utils";
import { findUser } from "@/api-lib/service/user.service";


export const getProjectsHandler = async( 
  req: NextApiRequest, 
  res: NextApiResponse 
) =>{
  try {
    const getProjectOptions = {
      projection: "-_id -projectMembers",
      populationPath: "projectOwner",
      populationMembers: "username userImage userBio githubId -_id",
      options: { lean: true }
    };
    const collavProjects = await getProjects(
      getProjectOptions.projection,
      getProjectOptions.populationPath,
      getProjectOptions.populationMembers,
      getProjectOptions.options);
    
      return res.status(200).json(collavProjects);
  } catch( error ) {
    validateError(error, 400, res);
  }
}

export const getOwnedProjects = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubIdSession(req);

  try {
    if ( !githubId ) return res.status(401).send("User must be signed in.");

    const currentUser = await findUser({ githubId }, { lean: false });
  
    if ( !currentUser ) return res.status(403).send("Forbidden. Create your account properly.");
 
    await currentUser.populate("ownedProjects");

    return res.status(200).json(currentUser.ownedProjects);
  } catch( error ){
    
  }
}

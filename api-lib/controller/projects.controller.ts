import { NextApiRequest, NextApiResponse } from "next"
import { getProjects } from "@/api-lib/service/projects.service"


export const getProjectsHandler = async( 
  req: NextApiRequest, 
  res: NextApiResponse 
) =>{
  try {
    const getProjectOptions = {
      projection: "-_id -projectMembers",
      populationPath: "projectOwner",
      populationMembers: "username userImage userBio -_id",
      options: { lean: true }
    };
    const collavProjects = await getProjects(
      getProjectOptions.projection,
      getProjectOptions.populationPath,
      getProjectOptions.populationMembers,
      getProjectOptions.options);

    return res.status(200).json(collavProjects);
  } catch( error ) {
    
  }
}
import { NextApiRequest, NextApiResponse } from "next";
import { getGithubIdSession, getProperty } from "@/api-lib/utils";
import { findUser } from "@/api-lib/service/user.service";
import { findProject } from "@/api-lib/service/project.service";


interface RequestQuery {
  projectId?: string,
  userId?: string[]
}

export const createNotificationHandler = ( response: String ) => async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubIdSession(req);
  const requestQuery: RequestQuery = req.query;
  const projectId: keyof RequestQuery = "projectId";
  const userIdArray: keyof RequestQuery = "userId";
  const userId = getProperty(requestQuery, userIdArray);

  try {
    if ( !githubId ) return res.status(401).send("User must be logged in.");

    const currentUser = await findUser({ githubId }, { lean: false });
    
    if ( !currentUser ) return res.status(403).send("Forbidden. Create your account properly.");

    const requestedProjectOwner = userId? await findUser({ githubId: userId[0] }, { lean: false }) : null;
    
    if ( !requestedProjectOwner ) return res.status(404).send("Project owner not found.");


    // const requestedProject = await

  } catch( error ){

  } 
}
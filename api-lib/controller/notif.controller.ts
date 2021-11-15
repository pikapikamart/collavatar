import { NextApiRequest, NextApiResponse } from "next";
import { getGithubIdSession } from "../utils";
import { findUser } from "../service/user.service";


export const createNotifHandler = ( response: String ) => async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
    const githubId = await getGithubIdSession(req);

    try {
      if ( !githubId ) return res.status(401).send("User must be logged in.");

      const currentUser = await findUser({ githubId }, { lean: false });
      
      if ( !currentUser ) return res.status(403).send("Forbidden. Create your account properly.");

      

    } catch( error ){

    } 
}
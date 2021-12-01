import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { getSession } from "next-auth/react";
import { ClientError } from "../controller/defaultMessages";


export const verifyUser = async (
  req: NextApiRequest, 
  res: NextApiResponse, 
  next: NextHandler
) =>{
  const userSession = await getSession({ req });
  
  if ( userSession && userSession.user ) {
    return next();
  }

  return res.status(401).json(ClientError()[401]);
}


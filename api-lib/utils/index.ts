import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react";
import { ValidationError } from "yup";
import { Error } from "mongoose";
import { findUser } from "@/api-lib/service/user.service";


interface GithubEmail {
  email: string,
  primary: boolean,
  verified: boolean,
  visibility: null | string
}

export function getProperty<Type, Key extends keyof Type>(object: Type, key: Key): Type[Key] {
  return object[key];
}

export const fetchGithubEmail = async( accessToken: string ) =>{
  const githubEmail = await fetch("https://api.github.com/user/emails", {
      headers: {
        "Authorization": `token ${accessToken}`
      }
    });
  
  const processedEmail: GithubEmail[] = await githubEmail.json();
  const primaryEmail = processedEmail.find(( email: GithubEmail) => email.primary);

  return primaryEmail? primaryEmail.email : "";
}

interface UserSession {
  name?: string | null
  email?: string | null
  image?: string | null,
  githubId?: string
}

export const getGithubId = async (req: NextApiRequest) =>{
  const userSession = await getSession({ req });

  if ( !userSession || !userSession.user ) return "";

  const user: UserSession = userSession.user;
  const githubId = getProperty(user, "githubId");

  return githubId;
}

export const getCurrentUser = async(
  githubId: string, 
  res: NextApiResponse
)=>{
  const currentUser = await findUser({ githubId }, { lean: false });

  if ( !currentUser ) return res.status(403).send("Forbidden. Create your account properly.");

  return currentUser;
}

export const validateError = (
  error: unknown, 
  httpStatus: number, 
  res: NextApiResponse
) =>{
  if ( error instanceof ValidationError ) {
    console.log(error.errors);
    return res.status(httpStatus).send(error.errors)
  } 
  if ( error instanceof Error ) {
    console.log(error.message);
    return res.status(httpStatus).send(error.message);
  } else {
    return res.status(500).send("Server error. Please try again later.");
  }
}

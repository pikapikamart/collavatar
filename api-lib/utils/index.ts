import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next"
import { ValidationError } from "yup";
import { Error } from "mongoose";


interface GithubEmail {
  email: string,
  primary: boolean,
  verified: boolean,
  visibility: null | string
}

export const fetchGithubEmail = async( accessToken: String ) =>{
  const githubEmail = await fetch("https://api.github.com/user/emails", {
      headers: {
        "Authorization": `token ${accessToken}`
      }
    });
  
  const processedEmail = await githubEmail.json();
  const primaryEmail: GithubEmail = processedEmail.find(( email: GithubEmail) => email.primary);

  return primaryEmail.email;
}

export const getGithubIdSession = async (req: NextApiRequest) =>{
  const userSession = await getSession({ req });

  if ( userSession && userSession.user ) {
    const githubId = userSession.user["githubId" as keyof typeof userSession.user];

    return githubId;
  }

  return null;
}

export function getProperty<Type, Key extends keyof Type>(object: Type, key: Key) {
  return object[key];
}

export const validateError = (error: unknown, httpStatus: number, res: NextApiResponse) =>{
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

import { NextApiResponse } from "next"
import { ValidationError } from "yup";
import { Error } from "mongoose";
import { findUser } from "@/api-lib/service/user.service";


export function getProperty<Type, Key extends keyof Type>(object: Type, key: Key): Type[Key] {
  return object[key];
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
    console.log(error);
    return res.status(httpStatus).send(error.errors)
  } 
  if ( error instanceof Error ) {
    console.log(error);
    return res.status(httpStatus).send(error.message);
  } else {
    console.log(error);
    return res.status(500).send("Server error. Please try again later.");
  }
}

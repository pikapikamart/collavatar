import { NextApiResponse } from "next"
import { ValidationError } from "yup";
import { Error } from "mongoose";
import { cloudinary } from "@/api-lib/utils/cloudinary";
import { findUser } from "@/api-lib/service/user.service";


export const getCurrentUser = async( 
  githubId: string,
  res: NextApiResponse,
  projection: string = ""
)=>{
  const currentUser = await findUser({ githubId }, projection, { lean: false });
  
  if ( !currentUser ) return res.status(403).send("Forbidden. Create your account properly.");

  return currentUser;
}

export const sendCloudinaryImage = async( image: string ) =>{
  if ( image ) {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: "collavatar",
    });
    return uploadResponse.url;
  }
  return ""
}

export const validateError = (error: unknown, httpStatus: number, res: NextApiResponse) =>{
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

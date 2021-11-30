import { cloudinary } from "@/api-lib/utils/cloudinary";
import { findUser } from "@/api-lib/service/user.service";


export const getCurrentUser = async( 
  githubId: number,
  projection: string = ""
)=>{
  const currentUser = await findUser({ githubId }, { lean: false }, projection);
  
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



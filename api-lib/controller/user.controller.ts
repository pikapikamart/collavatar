import { NextApiRequest, NextApiResponse } from "next";
import { getGithubIdSession } from "../utils";
import { findUser } from "../service/user.service";
import { cloudinary } from "../utils/cloudinary";
import { updateUser } from "../service/user.service";
import { validateError } from "../utils";


interface UserUpdateProfile {
  username: string,
  userBio: string
  userImage: string,
}

export const updateUserHandler = async(
  req: NextApiRequest, 
  res: NextApiResponse
) =>{
  const githubId = await getGithubIdSession(req);
  const requestUpdateInformation: UserUpdateProfile = {...req.body};
  
  try {
    if ( !githubId ) return res.status(401).send("User must be logged in.");

    const currentUser = await findUser({ githubId });

    if ( !currentUser ) return res.status(403).send("Forbidden. Create your account properly.");

    let newImageUrl;
    // Send request to cloudinary
    if ( requestUpdateInformation.userImage ) {
      const uploadResponse = await cloudinary.uploader.upload(requestUpdateInformation.userImage, {
        upload_preset: "collavatar",
      });
      newImageUrl = uploadResponse.url;
    }
    // End of send request to cloudinary
    const newUserUpdateInformation = Object.assign({
      username: requestUpdateInformation.username,
      userBio: requestUpdateInformation.userBio
    }, newImageUrl? {userImage: newImageUrl}: null);

    await updateUser({ githubId }, newUserUpdateInformation);
    
    return res.status(200).send("Update user information successful.");
  } catch(error) {
    validateError(error, 400, res);
  }
}
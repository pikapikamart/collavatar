import { NextApiRequest, NextApiResponse } from "next";
import { getGithubId } from "@/api-lib/utils/github";
import { validateError, getCurrentUser } from "@/api-lib/utils";
import { updateUser } from "@/api-lib/service/user.service";
import { cloudinary } from "@/api-lib/utils/cloudinary";


interface UserUpdateProfile {
  username: string,
  userBio: string
  userImage: string,
}

export const updateUserHandler = async(
  req: NextApiRequest, 
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);
  const requestUpdateInformation: UserUpdateProfile = {...req.body};
  
  try {
    const currentUser = githubId? await getCurrentUser(githubId, res) : null;

    if ( currentUser ) {

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
    }
  } catch(error) {
    validateError(error, 400, res);
  }
}
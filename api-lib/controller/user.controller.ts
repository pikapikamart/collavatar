import { NextApiRequest, NextApiResponse } from "next";
import { getGithubId } from "@/api-lib/utils/github";
import {  getCurrentUser, validateError, sendCloudinaryImage } from "@/api-lib/utils";
import { updateUser } from "@/api-lib/service/user.service";


export const getCurrentUserHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);

  const userProjection = "-_id -githubEmail -githubAccessToken -githubUsername -updatedAt";

  const currentUser = githubId? await getCurrentUser(githubId, userProjection) : null;
  
  return res.status(200).json(currentUser);
}

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
    const currentUser = githubId? await getCurrentUser(githubId) : null;

    if ( !currentUser || !githubId ) return res.status(403).send("Forbidden. Create your account properly.");

    const newImageUrl = await sendCloudinaryImage(requestUpdateInformation.userImage);
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
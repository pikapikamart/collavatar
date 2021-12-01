import { NextApiRequest, NextApiResponse } from "next";
import { getGithubId } from "@/api-lib/utils/github";
import { getCurrentUser, sendCloudinaryImage } from "@/api-lib/utils";
import { UserDocument } from "@/api-lib/models/userModel";
import { updateUser } from "@/api-lib/service/user.service";
import { ClientError, validateError } from "@/api-lib/utils/errors";
import { ClientSuccess } from "@/api-lib/utils/success";


export const getCurrentUserHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);

  const userProjection = "-_id -githubEmail -githubAccessToken -githubUsername -updatedAt";

  const currentUser = githubId? await getCurrentUser(githubId, userProjection) : null;
 
  return ClientSuccess(res, 200, "", currentUser);
}

export const updateUserHandler = async(
  req: NextApiRequest, 
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);
  const updateProfile: UserDocument = {...req.body};
  
  try {
    const currentUser = githubId? await getCurrentUser(githubId) : null;

    if ( !currentUser || !githubId ) {
      return ClientError(res, 403);
    }

    const newImageUrl = await sendCloudinaryImage(updateProfile.userImage);
    const newUserUpdateInformation = Object.assign({
      username: updateProfile.username,
      userBio: updateProfile.userBio,
    }, newImageUrl? {userImage: newImageUrl} : null,
      updateProfile.isDoneConfiguring ? { isDoneConfiguring: true } : null);
    
    await updateUser({ githubId }, newUserUpdateInformation);
    
    return ClientSuccess(res, 200, "Update user information successful");
  } catch(error) {
    validateError(error, 400, res);
  }
}
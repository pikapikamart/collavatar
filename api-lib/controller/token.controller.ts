import { NextApiRequest, NextApiResponse } from "next"
import { getGithubId } from "@/api-lib/utils/github";
import { getCurrentUser } from "@/api-lib/utils";
import { ClientError, validateError } from "@/api-lib/utils/errors";
import { ClientSuccess } from "@/api-lib/utils/success";


export const getAccessTokenHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);

  try {
    const currentUser = githubId? await getCurrentUser(githubId) : null;
  
    if ( !currentUser ) {
      return ClientError(res, 403);
    }

    const accessToken = currentUser.githubAccessToken;
    
    return ClientSuccess(res, 200, "", accessToken);
  } catch( error ) {
    validateError(error, 400, res);
  }
}
import { NextApiRequest, NextApiResponse } from "next"
import { getGithubId } from "@/api-lib/utils/github";
import { validateError, getCurrentUser } from "@/api-lib/utils";


export const getReposHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubId(req);

  try {
    const currentUser = githubId? await getCurrentUser(githubId, res) : null;
  
    if ( currentUser ) {
      const accessToken = currentUser.githubAccessToken;
      
      return res.status(200).json({token: accessToken});
    }
  } catch( error ) {
    validateError(error, 400, res);
  }
}
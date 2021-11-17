import { NextApiRequest, NextApiResponse } from "next";
import { getGithubIdSession, getProperty } from "@/api-lib/utils";
import { findUser } from "@/api-lib/service/user.service";
import { findProject } from "@/api-lib/service/project.service";
import { createProjectRequest } from "@/api-lib/service/notification.service";
import { validateError } from "@/api-lib/utils";


interface RequestQuery {
  projectId?: string[],
}

export const createProjectRequestHandler = async(
  req: NextApiRequest,
  res: NextApiResponse
) =>{
  const githubId = await getGithubIdSession(req);
  const requestQuery: RequestQuery = req.query;
  const projectId = getProperty(requestQuery, "projectId");

  try {
    if ( !githubId ) return res.status(401).send("User must be signed in.");

    const currentUser = await findUser({ githubId }, { lean: false });
    
    if ( !currentUser ) return res.status(403).send("Forbidden. Create your account properly.");

    const requestedProject = projectId? await findProject({ projectId: projectId[0] }, { lean: false }) : null;

    if ( !requestedProject ) return res.status(404).send("Project requested not found.");

    const projectOwner = await findUser({ _id: requestedProject.projectOwner }, { lean: false });

    const requestInformation = {
      requester: currentUser._id,
      project: requestedProject._id,
      ...req.body,
      notificationType: "request",
    }

    await createProjectRequest(requestInformation, projectOwner);
    
    return res.status(200).send("Request for project successful.");
  } catch( error ){
    validateError(error, 400, res);
  } 
}

import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { UserDocument } from "@/api-lib/models/userModel";


interface UserSession {
  name?: string | null
  email?: string | null
  image?: string | null,
  githubId?: string
}

export const getGithubId = async (req: NextApiRequest) =>{
  const userSession = await getSession({ req });

  if ( !userSession || !userSession.user ) return "";

  const user: UserSession = userSession.user;
  const githubId = user.githubId;

  return githubId;
}

interface GithubEmail {
  email: string,
  primary: boolean,
  verified: boolean,
  visibility: null | string
}

export const fetchGithubEmail = async( accessToken: string ) =>{
  const githubEmail = await fetch("https://api.github.com/user/emails", {
      headers: {
        "Authorization": `token ${accessToken}`
      }
    });
  
  const processedEmail: GithubEmail[] = await githubEmail.json();
  const primaryEmail = processedEmail.find(( email: GithubEmail) => email.primary);

  return primaryEmail? primaryEmail.email : "";
}

// Haven't typed
interface Repository {
  [key: string] : any
}

export const checkProjectInGithubUser = async( accessToken: string,projectName: string   ) =>{
  const userRepositories = await fetch("https://api.github.com/user/repos", {
    headers: {
      "Authorization": `token ${accessToken}`
    }
  });

  const processedRepositories: Repository[] = await userRepositories.json();
  const findRepository = processedRepositories.find(repo => (
    repo.name===projectName
  ))

  return findRepository? true : false;
}

interface Invitee {
  repo: string,
  username: string
}

export const sendGithubUserInvite = async(owner: UserDocument, invitee: Invitee): Promise<string> =>{
  const inviteUser = await fetch(`https://api.github.com/repos/${owner.githubUsername}/${invitee.repo}/collaborators/${invitee.username}`, {
    method: "PUT",
    headers: {
      "Authorization": `token ${owner.githubAccessToken}`
    }
  });

  const inviteInformation = await inviteUser.json();

  return inviteInformation.id;
}

export const acceptGithubUserInvite = async(requester: UserDocument,githubInviteId: string) =>{
  const acceptInvite = await fetch(`https://api.github.com/user/repository_invitations/${githubInviteId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `token ${requester.githubAccessToken}`
    }
  });
}
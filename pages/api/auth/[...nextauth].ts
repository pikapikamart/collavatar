import NextAuth, { User, Account, Profile } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectDatabase } from "@/api-lib/db";
import { CollavatarUser } from "@/api-lib/models/collavatarUser";
import { fetchGithubEmail } from "@/api-lib/utils";


const nextAuthProviders = [
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    authorization: {
      params: {
        scope: "user, notifications, repo:invite"
      }
    }
  })
];

interface NextAuthCallbacksITF {
  user: User,
  account: Account,
  profile: Profile
}

const nextAuthCallbacks = {
  async signIn({ user, account, profile }: NextAuthCallbacksITF) {
    await connectDatabase();

    const checkIfUserExist = await CollavatarUser.findOne({githubId: user.id});
   
    if ( !checkIfUserExist ) {
      const githubEmail = account.access_token && await fetchGithubEmail(account.access_token);
      
      const newCollavatarUser = {
        githubId: user.id,
        githubEmail: githubEmail,
        githubAccessToken: account.access_token && account.access_token,
        githubRepoLink: profile["html_url" as keyof typeof profile], 
        username: user.name 
      }

      await CollavatarUser.create(newCollavatarUser);
    }

    return true;
  }
}

const nextAuthOptions = {
  providers: nextAuthProviders,
  callbacks: nextAuthCallbacks
}

export default NextAuth(nextAuthOptions);
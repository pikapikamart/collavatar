import GithubProvider from "next-auth/providers/github";
import NextAuth, { User, Account, Profile, Session} from "next-auth";
import { JWT } from "next-auth/jwt";
import { connectDatabase } from "@/api-lib/db";
import { UserModel } from "@/api-lib/models/userModel";
import { fetchGithubEmail } from "@/api-lib/utils";


interface NextAuthCallbackSignInITF {
  user: User,
  account: Account,
  profile: Profile
}

interface NextAuthCallbackSessionITF {
  session: Session,
  user: User,
  token: JWT
}

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

const nextAuthCallbacks = {
  async signIn({ user, account, profile }: NextAuthCallbackSignInITF) {
    await connectDatabase(null, null, null);

    const checkIfUserExist = await UserModel.findOne({githubId: user.id});
   
    if ( !checkIfUserExist ) {
      const githubEmail = account.access_token && await fetchGithubEmail(account.access_token);
      
      const newUserModel = {
        githubId: user.id,
        githubEmail: githubEmail,
        githubAccessToken: account.access_token && account.access_token,
        githubRepoLink: profile["html_url" as keyof typeof profile], 
        username: user.name,
        userImage: user.image 
      }

      await UserModel.create(newUserModel);
    }

    return true;
  },
  async session({ session, user, token } : NextAuthCallbackSessionITF) {

    const newSession = {
      ...session,
      user: {
        ...session.user,
        githubId: token.sub
      }
    }
    return newSession; 
  }
}

const nextAuthOptions = {
  providers: nextAuthProviders,
  callbacks: nextAuthCallbacks,
  secret: process.env.HASH_SECRET as string
}


export default NextAuth(nextAuthOptions);
import GithubProvider from "next-auth/providers/github";
import NextAuth, { User, Account, Profile, Session} from "next-auth";
import { JWT } from "next-auth/jwt";
import { connectDatabase } from "@/api-lib/db";
import { findUser, createUser } from "@/api-lib/service/user.service";
import { UserDocument } from "@/api-lib/models/userModel";
import { getProperty } from "@/api-lib/utils";
import { fetchGithubEmail } from "@/api-lib/utils/github";


interface NextProfile extends Profile {
  html_url?: string
}

interface NextCallbackSignIn {
  user: User,
  account: Account,
  profile: NextProfile
}

interface NextCallbackSession {
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
        scope: "user:email, notifications, repo"
      }
    }
  })
];

const nextAuthCallbacks = {
  async signIn({ user, account, profile }: NextCallbackSignIn) {
    await connectDatabase(null, null, null);

    const checkUserExistence = await findUser({ githubId: user.id }, { lean: true });
   
    if ( !checkUserExistence ) {
      const githubRepoLink = getProperty(profile, "html_url");

      if ( !account.access_token ||
            !user.name ||
            !user.image ||
            !githubRepoLink ) return false;

      const githubEmail = await fetchGithubEmail(account.access_token);

      const newUserModel: UserDocument = {
        githubId: user.id,
        githubEmail: githubEmail,
        githubRepoLink: githubRepoLink, 
        githubAccessToken: account.access_token,
        githubUsername: user.name,
        username: user.name,
        userImage: user.image
      }

      await createUser(newUserModel);
    }

    return true;
  },
  async session({ session, user, token } : NextCallbackSession) {
    
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
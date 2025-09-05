import passport from 'passport';
// @ts-ignore
import { Strategy as GitLabStrategy } from 'passport-gitlab2';
import prisma from "../../../shared/prismaClient";
import dotenv from 'dotenv';

dotenv.config()
interface GitLabProfileEmail {
  value: string;
  verified?: boolean;
}

interface GitLabProfile {
  id: string;
  emails?: GitLabProfileEmail[];
  [key: string]: any;
}

interface GitLabVerifyCallback {
  (error: any, user?: any, info?: any): void;
}

passport.use(new GitLabStrategy(
  {
    clientID: process.env.GITLAB_CLIENT_ID!,
    clientSecret: process.env.GITLAB_CLIENT_SECRET!,
    callbackURL: process.env.CALLBACK_URL!,
    baseURL: "https://git.imn.htwk-leipzig.de",
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: GitLabProfile,
    done: GitLabVerifyCallback
  ) => {
    try {
      const email = profile.emails?.[0].value;
      const shibboleth_id: string = profile.id;
      console.log("🚨 GITLAB_CLIENT_ID:", process.env.GITLAB_CLIENT_ID);
      console.log("🚨 CALLBACK_URL:", process.env.CALLBACK_URL);

      let user = await prisma.users.findUnique({
        where: { shibboleth_id }
      });

      if (!user) {
        user = await prisma.users.create({
          data: { shibboleth_id }
        });
      }

      done(null, user);
    } catch (err) {
      done(err, undefined);
    }
  }
));

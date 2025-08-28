import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0].value;
      const shibboleth_id = profile.id;
      console.log("🚨 GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("🚨 CALLBACK_URL:", process.env.GOOGLE_CALLBACK_URL);

      // Nutzer in DB suchen
      let user = await prisma.users.findUnique({
        where: { shibboleth_id }
      });

      // Wenn nicht vorhanden, neuen Nutzer anlegen
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

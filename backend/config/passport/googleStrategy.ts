import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import GoogleUser from "../../models/googleUser";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await GoogleUser.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

export default passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await GoogleUser.findOne({ googleId: profile.id });
        if (!user) {
          user = await GoogleUser.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails![0].value,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

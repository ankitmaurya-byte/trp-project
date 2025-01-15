import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
} from "passport-google-oauth20";
import {
  Strategy as LinkedInStrategy,
  Profile as LinkedInProfile,
} from "passport-linkedin-oauth2";
import bcrypt from "bcryptjs";
import {
  Strategy as GitHubStrategy,
  Profile as GitHubProfile,
} from "passport-github2";

import dotenv from "dotenv";
import findOrCreateUser from "../utils/helper/findOrCreate"; // Import the utility function
import Recruiter from "../models/users/Recruiter";
import Candidate from "../models/users/Candidate";

// Load environment variables
dotenv.config();

// Serialize user into the session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(
  async (id: string, done: (err: any, user?: any | null) => void) => {
    try {
      const recruiterUser = await Recruiter.findById(id).exec();
      const candidateUser = await Candidate.findById(id).exec();
      done(null, recruiterUser || candidateUser);
    } catch (err) {
      done(err, null);
    }
  }
);

/**
 * LOCAL STRATEGY
 */
passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req: any, email: string, password: string, done: any) => {
      try {
        const { role } = req.body;
        let user;

        if (role === "recruiter") {
          user = await Recruiter.findOne({ email }).exec();
          if (!user) {
            user = new Recruiter({
              email,
              password,
              role,
            });
            await user.save();
          }
        } else {
          user = await Candidate.findOne({ email }).exec();
          if (!user) {
            user = new Candidate({
              email,
              password,
              role,
            });
            await user.save();
          }
        }

        if (!user.password) {
          return done(null, false, {
            message: "No password set for this user.",
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        req.login(user, (err: any) => {
          if (err) return done(err);
          return done(null, user);
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      passReqToCallback: true,
    },
    async (
      req: any,
      accessToken: string,
      refreshToken: string,
      profile: GoogleProfile,
      done: (error: any, user?: any | false) => void
    ) => {
      try {
        console.log("this is google");
        console.log(req.query);

        const { role } = JSON.parse(req.query.state as string);

        const user = await findOrCreateUser(role, profile, "googleId");

        // Explicitly typing the `err` parameter as `Error | null`
        req.login(user, (err: Error | null) => {
          if (err) return done(err);
          return done(null, user);
        });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// Repeat similar changes for GitHub, LinkedIn strategies

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK_URL as string,
      scope: ["user:email"],
      passReqToCallback: true,
    },
    async (
      req: any,
      accessToken: string,
      refreshToken: string,
      profile: GitHubProfile,
      done: (error: any, user?: any | false) => void
    ) => {
      try {
        const { role } = JSON.parse(req.query.state as string);

        const user = await findOrCreateUser(role, profile, "githubId");

        // Explicitly typing the `err` parameter as `Error | null`
        req.login(user, (err: Error | null) => {
          if (err) return done(err);
          return done(null, user);
        });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL as string,
      scope: ["r_emailaddress", "r_liteprofile"],
      passReqToCallback: true,
    },
    async (
      req: any,
      accessToken: string,
      refreshToken: string,
      profile: LinkedInProfile,
      done: (error: any, user?: any | false) => void
    ) => {
      try {
        const { role } = JSON.parse(req.query.state as string);

        const user = await findOrCreateUser(role, profile, "linkedinId");

        // Explicitly typing the `err` parameter as `Error | null`
        req.login(user, (err: Error | null) => {
          if (err) return done(err);
          return done(null, user);
        });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;

// backend/config/passport.ts
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
import User, { IUser } from "../models/User";
import dotenv from "dotenv";
import { IncomingMessage } from "http";

// Load environment variables
dotenv.config();

// Serialize user into the session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(
  async (id: string, done: (err: any, user?: IUser | null) => void) => {
    try {
      const user = await User.findById(id);
      done(null, user);
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
    { usernameField: "email" }, // Use 'email' instead of default 'username'
    async (
      email: string,
      password: string,
      done: (
        error: any,
        user?: IUser | false,
        options?: { message: string }
      ) => void
    ) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
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

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

/**
 * GOOGLE OAUTH STRATEGY
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: GoogleProfile,
      done: (error: any, user?: IUser | false) => void
    ) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        // If user with the same email exists, link accounts
        const email = profile.emails?.[0].value;
        if (email) {
          const userWithEmail = await User.findOne({ email });
          if (userWithEmail) {
            userWithEmail.googleId = profile.id;
            await userWithEmail.save();
            return done(null, userWithEmail);
          }
        }

        // Create a new user
        const newUser = new User({
          username: profile.displayName,
          email: profile.emails?.[0].value,
          googleId: profile.id,
          // Add other fields as needed
        });

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

/**
 * GITHUB OAUTH STRATEGY
 */
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK_URL as string,
      scope: ["user:email"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: GitHubProfile,
      done: (error: any, user?: IUser | false) => void
    ) => {
      try {
        const existingUser = await User.findOne({ githubId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        // Get primary email
        const emailObj =
          profile.emails?.find((email) => email.value) || profile.emails?.[0];
        const email = emailObj?.value;

        // If user with the same email exists, link accounts
        if (email) {
          const userWithEmail = await User.findOne({ email });
          if (userWithEmail) {
            userWithEmail.githubId = profile.id;
            await userWithEmail.save();
            return done(null, userWithEmail);
          }
        }

        // Create a new user
        const newUser = new User({
          username: profile.username || profile.displayName,
          email: email,
          githubId: profile.id,
          // Add other fields as needed
        });

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

/**
 * LINKEDIN OAUTH STRATEGY
 */
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL as string,
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: LinkedInProfile,
      done: (error: any, user?: IUser | false) => void
    ) => {
      try {
        const existingUser = await User.findOne({ linkedinId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        // Get email
        const email = profile.emails?.[0].value;

        // If user with the same email exists, link accounts
        if (email) {
          const userWithEmail = await User.findOne({ email });
          if (userWithEmail) {
            userWithEmail.linkedinId = profile.id;
            await userWithEmail.save();
            return done(null, userWithEmail);
          }
        }

        // Create a new user
        const newUser = new User({
          username: profile.displayName,
          email: email,
          linkedinId: profile.id,
          // Add other fields as needed
        });

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;

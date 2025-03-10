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
import findOrCreateUser from "../utils/helper/ssoHandler"; // Import the utility function
import Recruiter from "../models/users/Recruiter";
import Candidate from "../models/users/Candidate";
import handleSSOAuth from "../utils/helper/ssoHandler";

// Load environment variables
dotenv.config();

// Serialize user into the session
passport.serializeUser((user: any, done) => {
  console.log("serializer");
  console.log(user);
  console.log("serializer");
  done(null, { id: user.user._id, role: user.role });
});

passport.deserializeUser(async (data: { id: string; role: string }, done) => {
  try {
    console.log("de-serializer");
    console.log(data); // Logs { id: ..., role: ... }

    const { id, role } = data;

    // Fetch user based on id and role
    const user =
      role === "recruiter"
        ? await Recruiter.findById(id).exec()
        : await Candidate.findById(id).exec();

    if (user) {
      done(null, { id: user.id, role, ...user.toObject() }); // Pass complete user object to req.user
    } else {
      done(null, false); // User not found
    }
  } catch (err) {
    done(err);
  }
});
/**
 * LOCAL STRATEGY
 */
passport.use(
  "local-register",
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const { role, username } = req.body;

        // Check if username already exists in either Recruiter or Candidate collection
        const existingRecruiterUsername = await Recruiter.findOne({
          username,
        }).exec();
        const existingCandidateUsername = await Candidate.findOne({
          username,
        }).exec();

        if (existingRecruiterUsername || existingCandidateUsername) {
          return done(null, false, {
            message: "Username already taken",
          });
        }

        let user;

        if (role === "recruiter") {
          // Check if recruiter email already exists
          user = await Recruiter.findOne({ email }).exec();
          if (user) {
            return done(null, false, {
              message: "Email already registered as a recruiter",
            });
          }

          // Create new recruiter
          user = new Recruiter({
            username,
            email,
            password,
            role,
            company: "",
            notification: [],
            emailTemplates: [],
            savedcandidates: [],
            jobsPosted: [],
          });

          await user.save();
        } else if (role === "candidate") {
          // Check if candidate email already exists
          user = await Candidate.findOne({ email }).exec();
          if (user) {
            return done(null, false, {
              message: "Email already registered as a candidate",
            });
          }

          // Create new candidate
          user = new Candidate({
            username,
            email,
            password,
            role,
            skills: [],
            notification: [],
            status: "active",
            experience: [],
            education: [],
            jobsApplied: [],
            yearOfExperience: "0",
            noticePeriod: "0",
          });

          await user.save();
        } else {
          return done(null, false, { message: "Invalid role specified" });
        }

        return done(null, { user, role });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const { role } = req.body;
        let user;

        if (role === "recruiter") {
          user = await Recruiter.findOne({ email }).exec();
          if (!user) {
            return done(null, false, {
              message: "No recruiter found with this email",
            });
          }
        } else if (role === "candidate") {
          user = await Candidate.findOne({ email }).exec();
          if (!user) {
            return done(null, false, {
              message: "No candidate found with this email",
            });
          }
        } else {
          return done(null, false, { message: "Invalid role specified" });
        }

        if (!user.password) {
          return done(null, false, {
            message: "No password set for this user",
          });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, {
            message: "Incorrect email or password",
          });
        }

        return done(null, { user, role });
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
        const { role } = JSON.parse(req.query.state as string);
        console.log(role);

        const user = await handleSSOAuth(profile, "google", role);
        console.log("google stragey");
        // req.login(user, (err: Error | null) => {
        //   if (err) return done(err);
        //   console.log("stragey");
        //   console.log(user);
        return done(null, { user, role });
        // });
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

        const user = await handleSSOAuth(profile, "github", role);

        // Explicitly typing the `err` parameter as `Error | null`
        // req.login(user, (err: Error | null) => {
        //   if (err) return done(err);
        return done(null, { user, role });
        // });
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

        const user = await handleSSOAuth(profile, "linkedin", role);

        // Explicitly typing the `err` parameter as `Error | null`
        // req.login(user, (err: Error | null) => {
        //   if (err) return done(err);
        return done(null, { user, role });
        // });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;

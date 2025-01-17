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
  console.log("serialize");
  console.log(user);
  console.log("serialize");
  done(null, { id: user.user.id, role: user.role });
});

passport.deserializeUser(async (data: { id: string; role: string }, done) => {
  try {
    console.log("deserializeUser");
    console.log(data); // Logs { id: ..., role: ... }

    const { id, role } = data;

    // Fetch user based on id and role
    let user = null;
    if (role === "candidate") {
      user = await Candidate.findById(id);
    } else if (role === "recruiter") {
      user = await Recruiter.findById(id);
    }

    if (user) {
      done(null, { id: user.id, role, ...user.toObject() }); // Pass complete user object to req.user
    } else {
      done(null, false); // User not found
    }
  } catch (err) {
    done(err);
  }
}); // Deserialize user from the session
// passport.deserializeUser(
//   async (serializedUser: { id: string; role: string }, done) => {
//     try {
//       let user;
//       console.log("serializedUser");
//       console.log(serializedUser);

//       switch (serializedUser.role) {
//         case "candidate":
//           user = await Candidate.findById(serializedUser.id);
//           break;
//         case "recruiter":
//           user = await Recruiter.findById(serializedUser.id);
//           break;
//         default:
//           return done(null, user);
//         // return done(new Error("Invalid role"), null);
//       }

//       if (!user) {
//         return done(null, false);
//       }

//       done(null, user);
//     } catch (err) {
//       done(err, null);
//     }
//   }
// );
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
            const savedUser = await user.save();
            return { user: savedUser, role };
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
        const { role } = JSON.parse(req.query.state as string);

        const user = await handleSSOAuth(profile, "google", role);

        // Explicitly typing the `err` parameter as `Error | null`
        // console.log("profile", profile);

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

        const user = await handleSSOAuth(profile, "linkedin", role);

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

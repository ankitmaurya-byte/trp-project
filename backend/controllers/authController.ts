// @ts-nocheck
// backend/controllers/authController.ts
import express, { Request, Response, NextFunction } from "express";
import passport from "../config/passport";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
import logger from "../utils/logger";
import Candidate from "../models/users/Candidate";
import Recruiter from "../models/users/Recruiter";
import handleSSOAuth, { SSOProfile } from "../utils/helper/ssoHandler";
import jwt from "jsonwebtoken";
dotenv.config();

const FRONTEND_URL =
  process.env.FRONTEND_URL || "https://the-ready-pool.vercel.app";
const BACKEND_URL =
  process.env.BACKEND_URL || "https://trp-project.onrender.com/api/v1";

interface UserResponse {
  id: string;
  username: string;
  email?: string;
}

// Type for role parameter
type UserRole = "candidate" | "recruiter";

// Helper function to create user response object
const createUserResponse = (user: any): UserResponse => ({
  id: user._id,
  username: user.username,
  email: user.email,
});

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(
        `Registration validation failed: ${JSON.stringify(errors.array())}`
      );
      res.status(400).json({ errors: errors.array() });
      return;
    }

    passport.authenticate(
      "local-register",
      (err: Error, user: any, info: { message: string }) => {
        if (err) {
          logger.error(`Registration error: ${err}`);
          return next(err);
        }

        if (!user) {
          logger.warn(`Registration failed: ${info.message}`);
          return res.status(400).json({ message: info.message });
        }

        req.logIn(user, (err) => {
          if (err) {
            logger.error(`Login error during registration: ${err}`);
            return next(err);
          }
          logger.info(`New user registered: ${user.user.email}`);
          res.status(200).json({
            message: "Registration successful",
            user: createUserResponse(user),
          });
        });
      }
    )(req, res, next);
  } catch (err) {
    logger.error(`Registration error: ${err}`);
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(`Login validation failed: ${JSON.stringify(errors.array())}`);
      res.status(400).json({ errors: errors.array() });
      return;
    }

    passport.authenticate(
      "local-login",
      (err: Error, user: any, info: { message: string }) => {
        if (err) {
          logger.error(`Authentication error: ${err}`);
          return next(err);
        }

        if (!user) {
          logger.warn(`Authentication failed: ${info.message}`);
          return res.status(400).json({ message: info.message });
        }

        // req.logIn(user, (err) => {
        //   if (err) {
        //     logger.error(`Login error: ${err}`);
        //     return next(err);
        //   }

        logger.info(`User logged in: ${user.user.email}`);
        res.status(200).json({
          message: "Logged in successfully",
          user: createUserResponse(user.user),
        });
        // });
      }
    )(req, res, next);
  } catch (err) {
    logger.error(`Login error: ${err}`);
    next(err);
  }
};

// Generic SSO authentication handler
const handleSSOAuthentication = (
  provider: string,
  scope: string[] = ["profile", "email"]
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { role } = req.query;
    console.log("sso auth");

    if (!role || !["candidate", "recruiter"].includes(role as string)) {
      logger.warn(`Invalid role provided for ${provider} auth: ${role}`);
      res
        .status(400)
        .json({ error: "Valid role (candidate or recruiter) is required" });
      return;
    }

    passport.authenticate(provider, {
      scope,
      state: JSON.stringify({ role }),
      prompt: provider === "google" ? "select_account" : undefined,
    })(req, res, next);
  };
};

// Generic SSO callback handler
const handleSSOCallback = (provider: string) => {
  return [
    passport.authenticate(provider, {
      failureRedirect: `${FRONTEND_URL}/login`,
      failureMessage: true,
      session: true,
    }),
    (req: Request, res: Response, next: NextFunction) => {
      const { user, role } = req.user as { user: User; role: UserRole };
      if (!role) {
        logger.warn(`Role not provided in state for ${provider} callback`);
        return res.redirect(`${FRONTEND_URL}/login?error=auth_failed`);
      }
      res.redirect(`${FRONTEND_URL}/dashboard/${role}`);
    },
  ];
};
// async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const state = JSON.parse((req.query.state as string) || "{}");
//     const role = state.role as UserRole;

//     if (!role) {
//       throw new Error("Role not provided in state");
//     }

//     if (!req.user) {
//       throw new Error("User not authenticated");
//     }
//     const user = await handleSSOAuth(
//       req.user as SSOProfile,
//       provider,
//       role
//     );

//     req.login(user, (err) => {
//       if (err) {
//         logger.error(`SSO login error: ${err}`);
//         return next(err);
//       }

//       res.redirect(`${FRONTEND_URL}/${role}/dashboard`);
//     });
//   } catch (error) {
//     logger.error(`SSO callback error: ${error}`);
//     res.redirect(`${FRONTEND_URL}/login?error=auth_failed`);
//   }
// },
// Provider-specific routes using the generic handlers
export const googleAuth = handleSSOAuthentication("google", [
  "profile",
  "email",
  "openid",
]);
export const googleCallback = handleSSOCallback("google");

export const githubAuth = handleSSOAuthentication("github", ["user:email"]);
export const githubCallback = handleSSOCallback("github");

// export const linkedinAuth = handleSSOAuthentication("linkedin", [
//   "r_emailaddress",
//   "r_liteprofile",
// ]);
export const linkedinAuth = handleSSOAuthentication("linkedin");
export const linkedinCallback = handleSSOCallback("linkedin");

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await new Promise<void>((resolve, reject) => {
      req.logout((err) => {
        if (err) reject(err);
        resolve();
      });
    });

    req.session.destroy((err) => {
      if (err) {
        logger.error(`Session destruction error: ${err}`);
        res.status(500).json({ message: "Error logging out" });
        return;
      }

      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      logger.info("User logged out successfully");
      res.redirect(FRONTEND_URL);
    });
  } catch (err) {
    logger.error(`Logout error: ${err}`);
    next(err);
  }
};

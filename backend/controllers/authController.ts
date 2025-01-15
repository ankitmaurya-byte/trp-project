// backend/controllers/authController.ts
import express, { Request, Response, NextFunction } from "express";
import passport from "../config/passport";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import logger from "../utils/logger";
import User from "../models/User";

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Rate limiter for registration route
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many registration attempts from this IP, please try again after 15 minutes",
});

// Rate limiter for login route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
});

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(
      `Registration validation failed: ${JSON.stringify(errors.array())}`
    );
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`Registration attempt with existing email: ${email}`);
      res.status(400).json({ message: "Email is already in use." });
      return;
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    req.logIn(newUser, (err: Error) => {
      if (err) {
        logger.error(`Login error after registration: ${err}`);
        next(err);
        return;
      }

      const userResponse = {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      };

      logger.info(`New user registered and logged in: ${email}`);
      res
        .status(201)
        .json({ message: "Registered successfully", user: userResponse });
    });
  } catch (err) {
    logger.error(`Registration error: ${err}`);
    next(err);
    return;
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Login validation failed: ${JSON.stringify(errors.array())}`);
    res.status(400).json({ errors: errors.array() });
    return;
  }

  passport.authenticate(
    "local",
    (err: Error, user: any, info: { message: string }) => {
      if (err) {
        logger.error(`Authentication error: ${err}`);
        next(err);
        return;
      }
      if (!user) {
        logger.warn(`Authentication failed: ${info.message}`);
        res.status(400).json({ message: info.message });
        return;
      }
      req.logIn(user, (err: Error) => {
        if (err) {
          logger.error(`Login error: ${err}`);
          next(err);
          return;
        }
        const userResponse = {
          id: user._id,
          username: user.username,
          email: user.email,
        };
        logger.info(`User logged in: ${user.email}`);
        res
          .status(200)
          .json({ message: "Logged in successfully", user: userResponse });
      });
    }
  )(req, res, next);
};

export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
});

export const googleCallback = [
  passport.authenticate("google", {
    failureRedirect: `${FRONTEND_URL}/login`,
    failureMessage: true,
    session: true,
  }),
  (req: Request, res: Response) => {
    res.redirect(FRONTEND_URL);
  },
];

export const githubAuth = passport.authenticate("github", {
  scope: ["user:email"],
});

export const githubCallback = [
  passport.authenticate("github", {
    failureRedirect: `${FRONTEND_URL}/login`,
    failureMessage: true,
    session: true,
  }),
  (req: Request, res: Response) => {
    res.redirect(FRONTEND_URL);
  },
];

export const linkedinAuth = passport.authenticate("linkedin");

export const linkedinCallback = [
  passport.authenticate("linkedin", {
    failureRedirect: `${FRONTEND_URL}/login`,
    failureMessage: true,
    session: true,
  }),
  (req: Request, res: Response) => {
    res.redirect(FRONTEND_URL);
  },
];

export const logout = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.logout(function (err: Error) {
    if (err) {
      logger.error(`Logout error: ${err}`);
      next(err);
      return;
    }
    req.session.destroy((err: Error) => {
      if (err) {
        logger.error(`Session destruction error: ${err}`);
        res.status(500).json({ message: "Error logging out" });
        return;
      }
      res.clearCookie("connect.sid", { path: "/" });
      res.redirect(FRONTEND_URL);
    });
  });
};

// backend/routes/auth.ts
import express, { Request, Response, NextFunction } from "express";
import passport from "../config/passport";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import {
  register,
  login,
  googleCallback,
  githubCallback,
  linkedinCallback,
  logout,
  googleAuthWithRole,
  linkedinAuthWithRole,
  githubAuthWithRole,
} from "../controllers/authController";

dotenv.config();

const router = express.Router();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Rate limiter for registration route
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 registration requests per windowMs
  message:
    "Too many registration attempts from this IP, please try again after 15 minutes",
});

// Rate limiter for login route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
});

/**
 * REGISTER ROUTE
 */
router.post(
  "/register",
  registerLimiter,
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required.")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long."),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email address.")
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  register
);

/**
 * LOCAL AUTHENTICATION
 */
router.post(
  "/login",
  loginLimiter,
  [
    body("email").isEmail().withMessage("Please provide a valid email."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  login
);

/**
 * GOOGLE AUTHENTICATION
 */
router.get("/google", googleAuthWithRole);

router.get(
  "/google/callback",

  googleCallback
);

/**
 * GITHUB AUTHENTICATION
 */
router.get("/github", githubAuthWithRole);

router.get("/github/callback", githubCallback);

/**
 * LINKEDIN AUTHENTICATION
 */
router.get("/linkedin", linkedinAuthWithRole);

router.get(
  "/linkedin/callback",

  linkedinCallback
);

/**
 * LOGOUT
 */
router.get("/logout", logout);

export default router;

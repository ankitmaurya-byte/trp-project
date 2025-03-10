// backend/routes/auth.ts
import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import passport from "../config/passport";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  register,
  login,
  googleCallback,
  githubCallback,
  linkedinCallback,
  logout,
  googleAuth,
  linkedinAuth,
  githubAuth,
} from "../controllers/authController";
import { isAuthenticated } from "../middlewares/authMiddleware";

dotenv.config();

const router = express.Router();

const FRONTEND_URL =
  process.env.FRONTEND_URL || "https://the-ready-pool.vercel.app";

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
router.get("/google", googleAuth);

router.get(
  "/google/callback",

  googleCallback
);

/**
 * GITHUB AUTHENTICATION
 */
router.get("/github", githubAuth);

router.get("/github/callback", githubCallback);

/**
 * LINKEDIN AUTHENTICATION
 */
router.get("/linkedin", linkedinAuth);

router.get(
  "/linkedin/callback",

  linkedinCallback
);

/**
 * LOGOUT
 */
router.get("/logout", logout);
const sessionHandler = (async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET) as any;
    console.log(token);
    console.log(decoded);

    // Set session cookie
    // res.cookie("connect.sid", decoded.sessionCookie, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "none",
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    // Return success with user info
    res.status(200).json({
      success: true,
      redirectTo: `/dashboard/${decoded.role}`,
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid session" });
  }
}) as RequestHandler;

router.get("/session", sessionHandler);
export default router;

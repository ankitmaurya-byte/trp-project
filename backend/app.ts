import express, { Express } from "express";
import auth from "./routes/authRoutes";
import candidates from "./routes/candidateRoutes";
import jobRoutes from "./routes/jobRoutes";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import "./config/passport";
import errorHandler from "./middlewares/errorHandler";

export function createApp(): Express {
  const app: Express = express();
  app.use(express.json());
  app.use(cookieParser("helloworld"));
  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY as string,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000 * 60, // 1 hour
        secure: process.env.NODE_ENV === "production", // Set to true in production
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        sameSite: "lax", // Helps protect against CSRF
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI as string,
        // Additional store options if needed
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api/v1/auth", auth);
  app.use("/api/v1", candidates);
  app.use("/api/v1", jobRoutes);
  app.use(errorHandler);
  return app;
}

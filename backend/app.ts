import express, { Express } from "express";
import routes from "./routes/index";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import "./config/passport/googleStrategy";
import "./config/passport/localStrategy";

export function createApp(): Express {
  const app: Express = express();
  app.use(express.json());
  app.use(cookieParser("helloworld"));
  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY || "defaultSecretKey",
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
      },
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api/v1", routes);

  return app;
}

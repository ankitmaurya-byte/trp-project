import express, { Express } from "express";
import routes from "./routes/index";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
// import passport from "./config/passport";
import passport from "passport";
import errorHandler from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import "./models/Job";
import "./models/EmailTemplate";
import "./models/Application";
import "./models/users/Admin";
import "./models/users/Candidate";
import "./models/users/Recruiter";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Swagger version
    info: {
      title: "My API", // API name
      version: "1.0.0", // API version
      description: "This is the API documentation for my Node.js app",
    },
    servers: [
      {
        url: "https://trp-project.onrender.com", // Your base URL
      },
    ],
  },
  // Path to the API specifications
  apis: ["./routes/*.ts"], // Path to the routes where you define Swagger annotations
};
export function createApp(): Express {
  const app: Express = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY as string,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 600000 * 60000,

        secure: false, // Set to true in production
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        sameSite: "lax", // Helps protect against CSRF
        domain: process.env.FRONTEND_URL
          ? new URL(process.env.FRONTEND_URL).hostname
          : "localhost",
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI as string,
        // Additional store options if needed
      }),
    })
  );
  // Initialize swagger-jsdoc
  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  // Serve Swagger UI with the documentation
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api/v1", routes);

  app.get("/", (req, res) => {
    console.log(req.user);
    res.send("thankyou");
  });
  app.use(errorHandler);
  return app;
}

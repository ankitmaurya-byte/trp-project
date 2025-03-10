// console.log("this is log");
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/database";
import { createApp } from "./app";
import cors from "cors";

connectDB().then(() => {
  const port = process.env.PORT || 5000;
  const app = createApp();
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      exposedHeaders: ["Set-Cookie"],
    })
  );

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

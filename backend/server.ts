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
      origin: "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

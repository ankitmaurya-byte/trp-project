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
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

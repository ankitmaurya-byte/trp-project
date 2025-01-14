import { Router } from "express";
// import usersRouter from "./users.mjs";
// import productsRouter from "./products.mjs";
import authRouter from "../controllers/authController";

const router = Router();

// router.use(usersRouter);
// router.use(productsRouter);
router.use("/auth", authRouter);

export default router;

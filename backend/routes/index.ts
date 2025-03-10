import express, { Router } from "express";
import recruiterRoutes from "./recruiterRoutes";
import jobRoutes from "./jobRoutes";
import applicationRoutes from "./applicationRoutes";
import authRoutes from "./authRoutes";
import candidates from "./candidateRoutes";
import userRoutes from "./userRoutes";
import "./swagger/user";
import {
  checkPermissionOnly,
  isAuthenticated,
} from "../middlewares/authMiddleware";
const router: Router = express.Router();

router.use("/recruiter", recruiterRoutes);
router.use("/jobs", jobRoutes);
// router.use("/applications", applicationRoutes);
router.use("/auth", authRoutes);
// router.use("/user", userRoutes);
router.use("/candidate", candidates);
router.post("/auth/check-session", isAuthenticated, (req, res) => {
  console.log(req.user);

  res.json({
    isAuthenticated: true,
    ...req.user,
  });
});
export default router;

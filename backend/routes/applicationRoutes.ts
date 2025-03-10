import express, { Router } from "express";
import {
  isAuthenticated,
  checkPermissionOnly,
} from "../middlewares/authMiddleware";
import {
  getMessages,
  markMessageViewed,
} from "../controllers/applicationController";

const router: Router = express.Router();

router.get(
  "/messages",
  isAuthenticated,
  checkPermissionOnly(["recruiter"]),
  getMessages
);
router.put(
  "/message/:messageId",
  isAuthenticated,
  checkPermissionOnly(["recruiter"]),
  markMessageViewed
);
// router.get(
//   "/candidate/:candidateId",
//   isAuthenticated,
//   checkPermissionOnly(["recruiter"]),
//   getCandidateProfile
// );

export default router;

import {
  findUser,
  markMessageViewed,
  markNotificationViewed,
} from "../controllers/userController";
import { checkAuthOnly, isAuthenticated } from "../middlewares/authMiddleware";
import express from "express";

const router = express.Router();

router.get("/findUser", isAuthenticated, findUser);
router.patch("/messages/:messageId/view", isAuthenticated, markMessageViewed);
router.patch(
  "/notifications/:notificationId/view",
  isAuthenticated,
  markNotificationViewed
);

export default router;

import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.redirect("/home");
});

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/home");
  }
);

export default router;

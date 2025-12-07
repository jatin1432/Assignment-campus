const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { registerUser, loginUser } = require("../controller/authController");
const { googleCallback } = require("../controller/googleController");

require("../config/passportConfig")(passport);

const router = express.Router();

// Email/password routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Google login start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failed", session: false }),
  googleCallback
);

// Login failed route
router.get("/login-failed", (req, res) => {
  res.status(401).json({ message: "Google login failed" });
});

module.exports = router;

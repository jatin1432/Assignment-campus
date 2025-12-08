const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { registerUser, loginUser } = require("../controller/authController");
const { googleCallback } = require("../controller/googleController");

require("../config/passportConfig")(passport);

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);


router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failed", session: false }),
  googleCallback
);

router.get("/login-failed", (req, res) => {
  res.status(401).json({ message: "Google login failed" });
});

module.exports = router;

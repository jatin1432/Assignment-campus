const jwt = require("jsonwebtoken");
const User = require("../model/User");

const googleCallback = (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.redirect(`${process.env.FRONTEND_URL}/login?error=no-user`);

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Redirect to frontend Thank You page
    res.redirect(`${process.env.FRONTEND_URL}/thank-you?token=${token}`);
  } catch (err) {
    console.error("Google Callback Error:", err);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=server`);
  }
};

module.exports = { googleCallback };

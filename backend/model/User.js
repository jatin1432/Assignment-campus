const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      select: false,
    },

    contact: { type: String },

    googleId: { type: String },

    otp: { type: String },
    otpExpires: { type: Date },

    isVerified: { type: Boolean, default: false },

    provider: {
      type: String,
      enum: ["email", "google", "otp"],
      default: "email",
    },

    avatar: { type: String },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);

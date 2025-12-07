const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true 
    },

    password: {
      type: String,
      select: false,       // Hide password by default when querying
    },

    contact: { type: String },

    googleId: { type: String },

    otp: { type: String },          // For OTP login
    otpExpires: { type: Date },

    isVerified: { type: Boolean, default: false },

    provider: { 
      type: String, 
      enum: ["email", "google", "otp"], 
      default: "email" 
    },

    avatar: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

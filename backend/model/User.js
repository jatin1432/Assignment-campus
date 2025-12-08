const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      default: "email" 
    },

    avatar: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);

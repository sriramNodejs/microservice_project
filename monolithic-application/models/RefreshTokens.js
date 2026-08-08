const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    device: String,
    ip: String,
    userAgent: String,
  },
  {
    timestamps: true,
  }
);

const RefreshTokens = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshTokens;
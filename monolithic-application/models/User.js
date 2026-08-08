const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: Number,
    },
    role: {
      type: [String],
      enum: ["admin", "seller", "user"],
      default: ["user"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "female",
    },
    otp: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User = model("user", userSchema);
module.exports = User;

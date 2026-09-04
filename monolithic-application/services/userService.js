const { catchAsync, AppError } = require("../utils/errorHandler");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshTokens");
const bcrypt = require("bcryptjs");
const saltRounds = Number(process.env.SALT_ROUNDS);
const stripe = require("../utils/stripe");

const {
  generateRefreshToken,
  generateAccessToken,
} = require("../utils/tokenHelper");
const { generateOTP } = require("../utils/helper");
const { sendMail } = require("../utils/mail");

const userService = {
  signup: async (body) => {
    const { email, password, phone } = body;

    const preUser = await User.findOne({ email: email.toLowerCase() });

    if (preUser) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      phone,
    });

    const customer = await stripe.customers.create({
      email: email,
      phone: phone,
    });

    newUser.stripeCustomerId = customer.id;
    await newUser.save();

    return {
      success: true,
      message: "User created successfully",
    };
  },

  login: async (req, body) => {
    const { email, password } = body;

    const user = await User.findOne({ email: email.toLowerCase() }).lean();

    if (!user) {
      throw new AppError("User Not found with this email", 404);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new AppError("Invalid Password", 400);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await RefreshToken.create({
      user: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      device: req.headers["x-device-name"] || "Unknown Device",
      ip: req.ip,
      userAgent: req.get("user-agent"),
    });

    return {
      success: true,
      message: "User logged in successfully",
      accessToken,
      refreshToken,
    };
  },

  profile: async (userId) => {
    const user = await User.findById(userId, { password: 0 });

    if (!user) {
      throw new AppError("User Not found", 404);
    }

    return {
      success: true,
      message: "User profile fetched successfully",
      user,
    };
  },

  updateProfile: async (userId, body) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User Not found with this email", 404);
    }

    await User.updateOne({ _id: user.id }, body, { new: true });
    // user.phone = body.phone;
    // user.gender = body.gender;

    await user.save();

    return {
      success: true,
      message: "User profile updated successfully",
    };
  },

  deleteUser: async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User Not found with this email", 404);
    }

    await User.deleteOne({ _id: user.id });

    return {
      success: true,
      message: "User deleted successfully",
    };
  },

  forgotPassword: async (body) => {
    const { email } = body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("User Not found with this email", 404);
    }

    const otp = generateOTP();

    await sendMail({
      to: email,
      subject: "OTP For your forget Password",
      templateName: "forgotPassword",
      data: { otp },
    });

    user.otp = otp;
    await user.save();

    return {
      success: true,
      message: "OTP sent to your email successfully",
    };
  },

  verifyOtp: async (body) => {
    const { email, otp, password } = body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("User Not found with this email", 404);
    }

    if (otp !== user.otp) {
      throw new AppError("OTP Mismatched , Try Again", 400);
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.otp = null;
    await user.save();

    return {
      success: true,
      message: "Password Changed Successfully",
    };
  },

  updatePassword: async (id, body) => {
    const { oldPassword, newPassword } = body;

    const user = await User.findById(id);
    if (!user) {
      throw new AppError("User Not found", 404);
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      throw new AppError("Invalid Password", 400);
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return {
      success: true,
      message: "Password Changed Successfully",
    };
  },

  generateRefreshToken: async (body) => {
    const { refreshToken } = body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token required",
      });
    }

    // implement throw new AppError

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );

      const storedToken = await RefreshToken.findOne({
        token: refreshToken,
        user: decoded.id,
      });

      if (!storedToken)
        return res.status(401).json({
          message: "Invalid refresh token",
        });

      if (storedToken.expiresAt < new Date()) {
        await storedToken.deleteOne();

        return res.status(401).json({
          message: "Refresh token expired",
        });
      }

      const user = await User.findById(decoded.id);

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      storedToken.token = newRefreshToken;
      storedToken.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      storedToken.ip = req.ip;
      storedToken.userAgent = req.get("user-agent");

      await storedToken.save();

      res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (err) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }
  },
};

module.exports = userService;

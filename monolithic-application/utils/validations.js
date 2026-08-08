const { body, validationResult } = require("express-validator");

const validationRules = {
  signup: [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),

    body("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .bail()
      .isMobilePhone("any")
      .withMessage("Invalid phone number"),
  ],
  login: [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  forgotPassword: [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email"),
  ],
  verifyOtp: [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email"),
    body("otp")
      .notEmpty()
      .withMessage("OTP is required")
      .bail()
      .isNumeric()
      .withMessage("OTP must be a number")
      .bail()
      .isLength({ min: 4, max: 4 })
      .withMessage("OTP must be 4 digits"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  updatePassword: [
    body("oldPassword")
      .notEmpty()
      .withMessage("Old Password is required")
      .bail()
      .isLength({ min: 8 })
      .withMessage("Old Password must be at least 8 characters"),
    body("newPassword")
      .notEmpty()
      .withMessage("New Password is required")
      .bail()
      .isLength({ min: 8 })
      .withMessage("New Password must be at least 8 characters"),
  ],
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array({ onlyFirstError: true })[0];

    console.log(errors.array());

    return res.status(400).json({
      success: false,
      message: firstError.msg,
      field: firstError.path,
    });
  }

  next();
};

module.exports = {
  validationRules,
  validate,
};

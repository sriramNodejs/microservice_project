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

  createAddressValidation: [
    body("houseNo")
      .trim()
      .notEmpty()
      .withMessage("House No/Flat No/Building is required")
      .isLength({ max: 100 })
      .withMessage("House No cannot exceed 100 characters"),

    body("addressLine2")
      .trim()
      .notEmpty()
      .withMessage("Address Line 2 is required")
      .isLength({ max: 255 })
      .withMessage("Address Line 2 cannot exceed 255 characters"),

    body("addressLine3")
      .optional()
      .trim()
      .isLength({ max: 255 })
      .withMessage("Address Line 3 cannot exceed 255 characters"),

    body("city")
      .trim()
      .notEmpty()
      .withMessage("City is required")
      .isLength({ max: 100 })
      .withMessage("City cannot exceed 100 characters"),

    body("state")
      .trim()
      .notEmpty()
      .withMessage("State is required")
      .isLength({ max: 100 })
      .withMessage("State cannot exceed 100 characters"),

    body("pinCode")
      .trim()
      .notEmpty()
      .withMessage("Pin Code is required")
      .matches(/^[1-9][0-9]{5}$/)
      .withMessage("Invalid Pin Code"),

    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Phone Number is required")
      .isMobilePhone("en-IN")
      .withMessage("Invalid Phone Number"),
  ],

  updateAddressValidation: [
    body("houseNo")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("House No cannot be empty")
      .isLength({ max: 100 })
      .withMessage("House No cannot exceed 100 characters"),

    body("addressLine2")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Address Line 2 cannot be empty")
      .isLength({ max: 255 })
      .withMessage("Address Line 2 cannot exceed 255 characters"),

    body("addressLine3")
      .optional()
      .trim()
      .isLength({ max: 255 })
      .withMessage("Address Line 3 cannot exceed 255 characters"),

    body("city")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("City cannot be empty")
      .isLength({ max: 100 })
      .withMessage("City cannot exceed 100 characters"),

    body("state")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("State cannot be empty")
      .isLength({ max: 100 })
      .withMessage("State cannot exceed 100 characters"),

    body("pinCode")
      .optional()
      .trim()
      .matches(/^[1-9][0-9]{5}$/)
      .withMessage("Invalid Pin Code"),

    body("phoneNumber")
      .optional()
      .trim()
      .isMobilePhone("en-IN")
      .withMessage("Invalid Phone Number"),
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

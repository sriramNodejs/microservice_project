const router = require("express").Router();
const userController = require("../controllers/userController");
const { validate, validationRules } = require("../utils/validations");
const { accessTokenMiddleware, hasRoleCheck } = require("../utils/tokenHelper");
const { fileUploadMiddleware } = require("../utils/helper");

// auth routes
router.post("/signup", validationRules.signup, validate, userController.signup);

// router.post("/seller-signup", validationRules.signup, validate, userController.signup);

router.post("/login", validationRules.login, validate, userController.login);

router.post(
  "/seller-login",
  validationRules.login,
  validate,
  userController.login,
);

router.post(
  "/admin-login",
  validationRules.login,
  validate,
  userController.login,
);

// router.post('/logout');

router.post(
  "/forgot-password",
  validationRules.forgotPassword,
  validate,
  userController.forgotPassword,
);

router.post(
  "/verify-otp",
  validationRules.verifyOtp,
  validate,
  userController.verifyOtp,
); // take new password

router.put(
  "/update-password",
  validationRules.updatePassword,
  validate,
  accessTokenMiddleware,
  userController.updatePassword,
);

// // user routes
router.get(
  "/profile",
  accessTokenMiddleware,
  hasRoleCheck(["seller", "user"]),
  userController.profile,
);

router.put(
  "/profile",
  accessTokenMiddleware,
  hasRoleCheck(["seller", "user"]),
  fileUploadMiddleware,
  userController.updateProfile,
);

router.delete(
  "/profile",
  accessTokenMiddleware,
  hasRoleCheck(["admin"]),
  userController.deleteUser,
);

// router.post('/refresh-token', );

module.exports = router;

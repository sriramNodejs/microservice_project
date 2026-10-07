const router = require("express").Router();
const { validate, validationRules } = require("../utils/validations");
const userController = require("../controllers/userController");
const { accessTokenMiddleware, hasRoleCheck } = require("../utils/tokenHelper");
const { fileUploadMiddleware } = require("../utils/helper");

// Create Product

// router.post("/", async (req, res) => {
//   const response = await req.app.locals.rpcClient.send(PRODUCT_QUEUE, {
//     action: "CREATE_PRODUCT",
//     data: req.body,
//   });

//   res.json(response);
// });

router.post("/login", validationRules.login, validate, userController.signIn);

router.post(
  "/seller-login",
  validationRules.login,
  validate,
  userController.signIn,
);

router.post(
  "/admin-login",
  validationRules.login,
  validate,
  userController.signIn,
);

router.post("/signup", validationRules.login, validate, userController.signUp);

// // router.post('/logout');

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

// // // user routes
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

router.get("/address", accessTokenMiddleware, userController.getAddresses);

router.get(
  "/address/:addressId",
  accessTokenMiddleware,
  userController.getOneAddress,
);

// Set default address

router.patch(
  "/address/:addressId",
  accessTokenMiddleware,
  userController.setDefaultAddress,
);

router.post(
  "/address",
  validationRules.createAddressValidation,
  validate,
  accessTokenMiddleware,
  userController.createAddress,
);

router.put(
  "/address/:addressId",
  validationRules.updateAddressValidation,
  validate,
  accessTokenMiddleware,
  userController.updateAddress,
);

router.delete(
  "/address/:addressId",
  validate,
  accessTokenMiddleware,
  userController.deleteAddress,
);

module.exports = router;

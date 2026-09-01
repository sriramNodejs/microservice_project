const router = require("express").Router();
const addressController = require("../controllers/addressController");
const { validate, validationRules } = require("../utils/validations");
const { accessTokenMiddleware } = require("../utils/tokenHelper");

router.get("/", accessTokenMiddleware, addressController.getAddresses);
router.post(
  "/",

  validationRules.createAddressValidation,
  validate,
  accessTokenMiddleware,
  addressController.createAddress,
);

module.exports = router;

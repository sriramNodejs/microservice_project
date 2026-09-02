const router = require("express").Router();
const addressController = require("../controllers/addressController");
const { validate, validationRules } = require("../utils/validations");
const { accessTokenMiddleware } = require("../utils/tokenHelper");

router.get("/", accessTokenMiddleware, addressController.getAddresses);

router.get("/:addressId", accessTokenMiddleware, addressController.getOneAddress);

// Set default address

router.patch("/:addressId", accessTokenMiddleware, addressController.setDefaultAddress);


router.post(
  "/",

  validationRules.createAddressValidation,
  validate,
  accessTokenMiddleware,
  addressController.createAddress,
);

router.put(
  "/:addressId",
  validationRules.updateAddressValidation,
  validate,
  accessTokenMiddleware,
  addressController.updateAddress,
);

router.delete(
  "/:addressId",
  validate,
  accessTokenMiddleware,
  addressController.deleteAddress,
);


module.exports = router;

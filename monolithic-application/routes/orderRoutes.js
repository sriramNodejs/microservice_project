const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { validate, validationRules } = require("../utils/validations");
const { accessTokenMiddleware } = require("../utils/tokenHelper");

router.post("/placeOrder", accessTokenMiddleware, orderController.placeOrder);

router.get("/user-orders", accessTokenMiddleware, orderController.getUserOrders);

router.get(
  "/user-order/:orderId",
  accessTokenMiddleware,
  orderController.getOneUserOrder,
);

module.exports = router;

const { catchAsync } = require("../utils/errorHandler");

const orderService = require("../services/orderService");

const orderController = {
  placeOrder: catchAsync(async (req, res, next) => {
    const response = await orderService.placeOrder(req.user.id, req.body);
    res.status(200).json(response);
  }),

  getUserOrders: catchAsync(async (req, res, next) => {
    const response = await orderService.getUserOrders(req.user.id, req.query);
    res.status(200).json(response);
  }),

  getOneUserOrder: catchAsync(async (req, res, next) => {
    const response = await orderService.getOneUserOrder(req.params.orderId);
    res.status(200).json(response);
  }),
};

module.exports = orderController;

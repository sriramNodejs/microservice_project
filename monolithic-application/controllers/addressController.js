const { catchAsync } = require("../utils/errorHandler");

const addressService = require("../services/addressService");

const addressController = {
  getAddresses: catchAsync(async (req, res, next) => {
    const response = await addressService.getAddresses(req.user.id);
    res.status(200).json(response);
  }),

  createAddress: catchAsync(async (req, res, next) => {
    const response = await addressService.createAddress(req.user.id, req.body);
    res.status(201).json(response);
  }),
};

module.exports = addressController;

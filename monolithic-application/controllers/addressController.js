const { catchAsync } = require("../utils/errorHandler");

const addressService = require("../services/addressService");

const addressController = {
  getAddresses: catchAsync(async (req, res, next) => {
    const response = await addressService.getAddresses(req.user.id);
    res.status(200).json(response);
  }),

  getOneAddress: catchAsync(async (req, res, next) => {
    const response = await addressService.getOneAddress(req.params.addressId);
    res.status(200).json(response);
  }),

  setDefaultAddress: catchAsync(async (req, res, next) => {
    const response = await addressService.setDefaultAddress(req.user.id, req.params.addressId);
    res.status(200).json(response);
  }),

  createAddress: catchAsync(async (req, res, next) => {
    const response = await addressService.createAddress(req.user.id, req.body);
    res.status(201).json(response);
  }),

  updateAddress: catchAsync(async (req, res, next) => {
    const response = await addressService.updateAddress(
      req.user.id,
      req.params.addressId,
      req.body,
    );
    res.status(200).json(response);
  }),

  deleteAddress: catchAsync(async (req, res, next) => {
    const response = await addressService.deleteAddress(req.params.addressId);
    res.status(200).json(response);
  }),
};

module.exports = addressController;

const { catchAsync, AppError } = require("../utils/errorHandler");
const Address = require("../models/Address");

const addressService = {
  getAddresses: async (userId) => {
    const addresses = await Address.find({ user: userId });

    return {
      success: true,
      message: "Addresses fetched successfully",
      addresses,
    };
  },

  createAddress: async (userId, body) => {
    const address = await Address.create({
      ...body,
      user: userId,
    });

    return {
      success: true,
      message: "Address created successfully",
      address,
    };
  },
};

module.exports = addressService;

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

  getOneAddress: async (addressId) => {
    const address = await Address.findById(addressId);

    if (!address) {
      throw new AppError("Address not found", 404);
    }

    return {
      success: true,
      message: "Address fetched successfully",
      address,
    };
  },

  setDefaultAddress: async (userId, addressId) => {
    const address = await Address.findById(addressId);

    if (!address) {
      throw new AppError("Address not found", 404);
    }
    await Address.updateMany({ user: userId }, { isDefault: false });

    address.isDefault = true;
    await address.save();

    return {
      success: true,
      message: "Default Address Saved Successfully",
      address,
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

  updateAddress: async (userId, addressId, body) => {
    const address = await Address.findOne({ user: userId, _id: addressId });

    if (!address) {
      throw new AppError("Address not found", 404);
    }

    Object.assign(address, body);
    await address.save(); // update operation

    return {
      success: true,
      message: "Address updated successfully",
      address,
    };
  },

  deleteAddress: async (addressId) => {
    const address = await Address.findByIdAndDelete(addressId);

    if (!address) {
      throw new AppError("Address not found", 404);
    }

    return {
      success: true,
      message: "Address deleted successfully",
      address,
    };
  },
};

module.exports = addressService;

const userService = require("../service/user.service");

async function userHandler(request) {
  let { action, data } = request;

  switch (action) {
    case "SIGN_UP":
      return await userService.signup(data);

    case "SIGN_IN":
      const { req, role } = data;
      return await userService.login(req, role);

    case "FORGOT_PASSWORD":
      return await userService.forgotPassword(data);

    case "VERIFY_OTP":
      return await userService.verifyOtp(data);

    case "UPDATE_PASSWORD":
      const { id, body } = data;
      return await userService.updatePassword(id, body);

    case "REFRESH_TOKEN":
      return await userService.generateRefreshToken(data);

    case "GET_PROFILE":
      //   const { id } = data;
      return await userService.profile(data.id);

    case "UPDATE_PROFILE":
      const { userId, updateData } = data;
      return await userService.updateProfile(userId, updateData);

    case "DELETE_USER":
      return await userService.deleteUser(data.id);

    // Address handling

    case "GET_ADDRESSES":
      return await userService.getAddresses(data.userId);

    case "GET_ONE_ADDRESS":
      return await userService.getOneAddress(data.addressId);

    case "CREATE_ADDRESS":
      return await userService.createAddress(data.userId, data.body);

    case "UPDATE_ADDRESS":
      return await userService.updateAddress(
        data.userId,
        data.addressId,
        data.body,
      );

    case "DELETE_ADDRESS":
      return await userService.deleteAddress(data.addressId);

    case "SET_DEFAULT_ADDRESS":
      return await userService.setDefaultAddress(data.userId, data.addressId);

    default:
      return {
        success: false,
        message: "Invalid Action",
      };
  }
}

module.exports = {
  userHandler,
};

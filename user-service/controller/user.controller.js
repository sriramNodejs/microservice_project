const userService = require("../service/user.service");

async function userHandler(request) {
  let { action, data } = request;

  switch (action) {
    case "SIGN_UP":
      return await userService.signup(data);

    case "SIGN_IN":
      const { req, role } = data;
      return await userService.login(req, req.body, role);

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

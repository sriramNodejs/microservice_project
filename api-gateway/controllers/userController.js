const { USER_QUEUE } = require("../rabbitmq/rabbitmq");
const { catchAsync } = require("../utils/errorHandler");

const userController = {
  signIn: catchAsync(async (req, res, next) => {
    const role =
      req.url === "/login"
        ? "user"
        : req.url === "/seller-login"
          ? "seller"
          : "admin";

    const reqObj = {
      body: req.body,
      ip: req.ip,
      userAgent: req.get("user-agent"),
      device: req.headers["x-device-name"] || "Unknown Device",
    };

    const data = {
      req: reqObj,
      role,
    };

    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "SIGN_IN",
      data,
    });

    res.status(200).json(response);
  }),

  signUp: catchAsync(async (req, res, next) => {
    const data = req.body;
    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "SIGN_UP",
      data,
    });

    res.status(200).json(response);
  }),

  forgotPassword: catchAsync(async (req, res, next) => {
    const data = { email: req.body.email };
    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "FORGOT_PASSWORD",
      data,
    });

    res.status(200).json(response);
  }),

  verifyOtp: catchAsync(async (req, res, next) => {
    const data = req.body;
    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "VERIFY_OTP",
      data,
    });

    res.status(200).json(response);
  }),

  updatePassword: catchAsync(async (req, res, next) => {
    const data = {
      id: req.user.id,
      body: req.body,
    };

    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "UPDATE_PASSWORD",
      data,
    });

    res.status(200).json(response);
  }),

  profile: catchAsync(async (req, res, next) => {
    const data = { id: req.user.id };
    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "GET_PROFILE",
      data,
    });

    res.status(200).json(response);
  }),

  updateProfile: catchAsync(async (req, res, next) => {
    const data = {
      userId: req.user.id,
      updateData: req.body,
    };
    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "UPDATE_PROFILE",
      data,
    });

    res.status(200).json(response);
  }),

  deleteUser: catchAsync(async (req, res, next) => {
    const data = { id: req.user.id };

    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "DELETE_USER",
      data,
    });

    res.status(200).json(response);
  }),

  // address handling
  getAddresses: catchAsync(async (req, res, next) => {
    const data = { userId: req.user.id };

    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "GET_ADDRESSES",
      data,
    });

    res.status(200).json(response);
  }),

  getOneAddress: catchAsync(async (req, res, next) => {
    const data = { addressId: req.params.addressId };

    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "GET_ONE_ADDRESS",
      data,
    });

    res.status(200).json(response);
  }),

  createAddress: catchAsync(async (req, res, next) => {
    const data = { userId: req.user.id, body: req.body };

    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "CREATE_ADDRESS",
      data,
    });

    res.status(200).json(response);
  }),

  updateAddress: catchAsync(async (req, res, next) => {
    const data = {
      userId: req.user.id,
      addressId: req.params.addressId,
      body: req.body,
    };

    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "UPDATE_ADDRESS",
      data,
    });

    res.status(200).json(response);
  }),

  deleteAddress: catchAsync(async (req, res, next) => {
    const data = { addressId: req.params.addressId };

    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "DELETE_ADDRESS",
      data,
    });

    res.status(200).json(response);
  }),

  setDefaultAddress: catchAsync(async (req, res, next) => {
    const data = { userId: req.user.id, addressId: req.params.addressId };

    const response = await req.app.locals.rpcClient.send(USER_QUEUE, {
      action: "SET_DEFAULT_ADDRESS",
      data,
    });

    res.status(200).json(response);
  }),
};

module.exports = userController;

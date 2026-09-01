const { catchAsync } = require("../utils/errorHandler");

const userService = require("../services/userService");

const userController = {
  signup: catchAsync(async (req, res, next) => {
    const response = await userService.signup(req.body);
    res.status(201).json(response);
  }),

  login: catchAsync(async (req, res, next) => {
    const response = await userService.login(req, req.body);
    res.status(200).json(response);
  }),

  forgotPassword: catchAsync(async (req, res, next) => {
    const response = await userService.forgotPassword(req.body);
    res.status(200).json(response);
  }),

  verifyOtp: catchAsync(async (req, res, next) => {
    const response = await userService.verifyOtp(req.body);
    res.status(200).json(response);
  }),

  updatePassword: catchAsync(async (req, res, next) => {
    const id = req.user.id;
    const response = await userService.updatePassword(id, req.body);
    res.status(200).json(response);
  }),

  refreshToken: catchAsync(async (req, res, next) => {
    const response = await userService.generateRefreshToken(req.body);
    res.status(200).json(response);
  }),

  profile: catchAsync(async (req, res, next) => {
    const response = await userService.profile(req.user.id);
    res.status(200).json(response);
  }),

  updateProfile: catchAsync(async (req, res, next) => {
    const response = await userService.updateProfile(req.user.id, req.body);
    res.status(200).json(response);
  }),

  deleteUser: catchAsync(async (req, res, next) => {
    const response = await userService.deleteUser(req.user.id);
    res.status(200).json(response);
  }),
};

module.exports = userController;

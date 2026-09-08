const { catchAsync } = require("../utils/errorHandler");

const reviewService = require("../services/reviewService");

const reviewController = {
  addReview: catchAsync(async (req, res, next) => {
    const response = await reviewService.addReview(req.user.id, req.body);
    res.status(201).json(response);
  }),

  updateReview: catchAsync(async (req, res, next) => {
    const response = await reviewService.updateReview(req.user.id, req.params.id ,req.body);
    res.status(200).json(response);
  }),

  getOneReview: catchAsync(async (req, res, next) => {
    const response = await reviewService.getOneReview(req.user.id, req.params.id);
    res.status(200).json(response);
  }),

  getAllReviews: catchAsync(async (req, res, next) => {
    const response = await reviewService.getAllReviews(req.user.id);
    res.status(200).json(response);
  }),
};

module.exports = reviewController;

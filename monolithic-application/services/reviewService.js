const { catchAsync, AppError } = require("../utils/errorHandler");
const Review = require("../models/Review");
const Order = require("../models/Order");

const {
  generateRefreshToken,
  generateAccessToken,
} = require("../utils/tokenHelper");
const { generateOTP } = require("../utils/helper");
const { sendMail } = require("../utils/mail");

const reviewService = {
  addReview: async (userId, body) => {
    const { orderId, rating, review } = body;

    const isReviewExist = await Review.findOne({
      user: userId,
      order: orderId,
    });

    if (isReviewExist) {
      throw new AppError("Review already added for this order", 400);
    }

    const order = await Order.findById(orderId);
    if (!order) {
      throw new AppError("Order not found", 404);
    }

    await Review.create({
      user: userId,
      product: order.productId,
      rating,
      review,
      order: orderId,
    });

    return {
      success: true,
      message: "Review added successfully",
    };
  },

  updateReview: async (userId, reviewId, body) => {
    const review = await Review.findOne({ user: userId, _id: reviewId });

    if (!review) {
      throw new AppError("Review not found", 404);
    }

    await Review.updateOne(
      { _id: reviewId },
      { review: body.review, rating: body.rating },
    );

    return {
      success: true,
      message: "Review updated successfully",
    };
  },

  getOneReview: async (userId, reviewId) => {
    const review = await Review.findOne({
      user: userId,
      _id: reviewId,
    }).populate("product", "name price");
    if (!review) {
      throw new AppError("Review not found", 404);
    }

    return {
      success: true,
      message: "Review retrieved successfully",
      data: review,
    };
  },

  getAllReviews: async (userId) => {
    const reviews = await Review.find({ user: userId })
      .populate("product", "name price")
      .sort({ createdAt: -1 });

    return {
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
    };
  },
};

module.exports = reviewService;

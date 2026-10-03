const orderService = require("../service/order.service");
const reviewService = require("../service/review.service");

async function orderHandler(request) {
  let { action, data } = request;

  switch (action) {
    case "PLACE_ORDER":
      return await orderService.placeOrder(data.id, data.body);

    case "GET_USER_ORDERS":
      const { id, query } = data;
      return await orderService.getUserOrders(id, query);

    case "GET_ONE_USER_ORDER":
      return await orderService.getOneUserOrder(data.orderId);

    // Review actions start
    case "ADD_REVIEW":
      return await reviewService.addReview(data.userId, data.body);

    case "UPDATE_REVIEW":
      return await reviewService.updateReview(
        data.userId,
        data.reviewId,
        data.body,
      );

    case "GET_ONE_REVIEW":
      return await reviewService.getOneReview(data.userId, data.reviewId);

    case "GET_ALL_REVIEWS":
      return await reviewService.getAllReviews(data.userId);
    default:
      return {
        success: false,
        message: "Invalid Action",
      };
  }
}

module.exports = {
  orderHandler,
};

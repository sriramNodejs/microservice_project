const { catchAsync, AppError } = require("../utils/errorHandler");
const RefreshToken = require("../models/RefreshTokens");
const bcrypt = require("bcryptjs");
const Product = require("../models/Product");
const Address = require("../models/Address");
const Order = require("../models/Order");
const User = require("../models/User");
const moment = require("moment");
const stripe = require("../utils/stripe");

const orderService = {
  placeOrder: async (userId, body) => {
    let { productId, quantity = 1, addressId } = body;

    console.log(body, "test");

    const user = await User.findById(userId, {
      stripeCustomerId: 1,
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    if (product.stock < quantity) {
      throw new AppError("Insufficient product quantity", 400);
    }

    const address = await Address.findById(addressId);
    if (!address) {
      throw new AppError("Address not found", 404);
    }

    // seller address, and buyer address -> calculate shipping cost

    // create payment Link

    const session = await stripe.checkout.sessions.create({
      customer: user.stripeCustomerId,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100, // it will take in Cents
          },
          quantity: quantity,
        },
      ],

      success_url: `http://localhost:3000/orders`,
      cancel_url: `http://localhost:3000/cart`,
    });

    // Mocking Payment Done

    return {
      success: true,
      message: "Order placed successfully",
      paymentUrl: session.url,
    };

    // // Decrease the product quantity
    // await Product.updateOne({ _id: productId }, { $inc: { stock: -quantity } });

    // // create order Record
    // await Order.create({
    //   user: userId,
    //   productId: productId,
    //   sellerId: product.sellerId,
    //   quantity,
    //   addressId: addressId,
    //   status: "placed",
    // });

    // return {
    //   success: true,
    //   message: "Order placed successfully",
    // };
  },

  getUserOrders: async (userId, query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

    const findObj = { user: userId };

    if (query.year) {
      const startOfYear = moment(query.year, "YYYY").startOf("year").toDate();
      const endOfYear = moment(query.year, "YYYY").endOf("year").toDate();

      findObj.createdAt = { $gte: startOfYear, $lte: endOfYear };
    }

    const orders = await Order.find(findObj)
      .populate("productId")
      .populate("addressId")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    return {
      success: true,
      message: "Orders retrieved successfully",
      orders,
    };
  },

  getOneUserOrder: async (orderId) => {
    const order = await Order.findById(orderId)
      .populate("productId")
      .populate("addressId");

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    return {
      success: true,
      message: "Order retrieved successfully",
      order,
    };
  },
};

module.exports = orderService;

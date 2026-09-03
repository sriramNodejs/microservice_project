const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    addressId: {
      type: Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "placed", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Order = model("order", orderSchema);
module.exports = Order;

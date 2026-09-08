const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      trim: true,
      required: false,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },

    // You can use images and videos (expres-fileupload)
  },
  {
    timestamps: true,
  },
);

const Review = model("reviews", reviewSchema);
module.exports = Review;

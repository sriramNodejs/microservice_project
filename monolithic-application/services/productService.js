const { catchAsync, AppError } = require("../utils/errorHandler");
const Product = require("../models/Product");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../utils/tokenHelper");
const { generateOTP } = require("../utils/helper");
const { sendMail } = require("../utils/mail");

const productService = {
  createProduct: async (userId, body) => {
    const newProduct = await Product.create({
      ...body,
      sellerId: userId,
    });

    return {
      success: true,
      message: "Product created successfully",
      newProduct,
    };
  },

  updateProduct: async (productId, body) => {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { ...body },
      { new: true },
    );

    if (!updatedProduct) {
      throw new AppError("Product not found", 404);
    }

    return {
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    };
  },

  getAllProducts: async (userId, query) => {
    const { page = 1, limit = 10, search } = query;

    const queryObj = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const products = await Product.find({
      sellerId: userId,
      ...queryObj,
      isDeleted: false,
    })

      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    return {
      success: true,
      message: "Products Fetched successfully",
      products,
    };
  },

  getOneProduct: async (productId) => {
    const product = await Product.findOne({ _id: productId, isDeleted: false });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return {
      success: true,
      message: "Product fetched successfully",
      product,
    };
  },

  deleteProduct: async (productId) => {
    const deletedProduct = await Product.updateOne(
      { _id: productId },
      {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      },
    );

    if (deletedProduct.matchedCount === 0) {
      throw new AppError("Product not found", 404);
    }

    return {
      success: true,
      message: "Product deleted successfully",
    };
  },
};

module.exports = productService;

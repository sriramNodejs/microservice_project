const { catchAsync } = require("../utils/errorHandler");

const productService = require("../services/productService");

const productController = {
  createProduct: catchAsync(async (req, res, next) => {
    const response = await productService.createProduct(req.user.id, req.body);
    res.status(200).json(response);
  }),

  updateProduct: catchAsync(async (req, res, next) => {
    const response = await productService.updateProduct(
      req.params.productId,
      req.body,
    );
    res.status(200).json(response);
  }),

  getAllProducts: catchAsync(async (req, res, next) => {
    const response = await productService.getAllProducts(req.user.id, req.query);
    res.status(200).json(response);
  }),

  getOneProduct: catchAsync(async (req, res, next) => {
    const response = await productService.getOneProduct(req.params.productId);
    res.status(200).json(response);
  }),

  deleteProduct: catchAsync(async (req, res, next) => {
    const response = await productService.deleteProduct(req.params.productId);
    res.status(200).json(response);
  }),
};

module.exports = productController;

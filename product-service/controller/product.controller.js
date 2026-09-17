const Product = require("../models/Product");
const productService = require("../service/product.service");

async function productHandler(request) {
  let { action, data } = request;

  switch (action) {
    case "CREATE_PRODUCT":
      const { userId, productData } = data;
      return await productService.createProduct(userId, productData);

    case "GET_PRODUCT":
      console.log("data", data);
      data = { userId: "6a772662907f08275da69103", query: {} };
      return await productService.getAllProducts(data.userId, data.query);

    case "GET_PRODUCT_BY_ID":
      return await productService.getOneProduct(data.productId);

    case "UPDATE_PRODUCT":
      return await productService.updateProduct(
        data.productId,
        data.productData,
      );

    case "DELETE_PRODUCT":
      return await productService.deleteProduct(data.productId);

    default:
      return {
        success: false,
        message: "Invalid Action",
      };
  }
}

module.exports = {
  productHandler,
};

const Product = require("../models/Product");
const productService = require("../service/product.service");

async function productHandler(request) {
  let { action, data } = request;
  const { userId } = data;

  switch (action) {
    case "CREATE_PRODUCT":
      const { body } = data;
      return await productService.createProduct(userId, body);

    case "GET_PRODUCT":
      console.log("data", data);
      const { query } = data;
      return await productService.getAllProducts(userId, query);

    case "GET_PRODUCT_BY_ID":
      return await productService.getOneProduct(data.productId);

    case "UPDATE_PRODUCT":
      return await productService.updateProduct(data.productId, data.body);

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

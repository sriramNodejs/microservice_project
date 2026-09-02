const router = require("express").Router();
const productController = require("../controllers/productController");
const { validate, validationRules } = require("../utils/validations");
const { accessTokenMiddleware } = require("../utils/tokenHelper");

// router.post('/', validationRules(), validate, productController.createProduct)
router.post('/', accessTokenMiddleware, productController.createProduct)

router.put('/:productId', accessTokenMiddleware,  productController.updateProduct)

router.get('/', accessTokenMiddleware, productController.getAllProducts)

router.get('/:productId', accessTokenMiddleware,  productController.getOneProduct)

router.delete('/:productId', accessTokenMiddleware, productController.deleteProduct)




module.exports = router;

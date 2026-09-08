const router = require("express").Router();
const reviewController = require("../controllers/reviewController");
const { validate, validationRules } = require("../utils/validations");
const { accessTokenMiddleware } = require("../utils/tokenHelper");

// auth routes
router.post("/", accessTokenMiddleware ,reviewController.addReview);

router.put("/:id", accessTokenMiddleware ,reviewController.updateReview);

router.get('/:id', accessTokenMiddleware ,reviewController.getOneReview);

router.get('/', accessTokenMiddleware ,reviewController.getAllReviews);



module.exports = router;

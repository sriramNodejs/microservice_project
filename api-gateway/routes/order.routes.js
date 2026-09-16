const router = require("express").Router();

const { PRODUCT_QUEUE } = require("../rabbitmq/rabbitmq");

// Create Product

router.post("/", async (req, res) => {
  const response = await req.app.locals.rpcClient.send(PRODUCT_QUEUE, {
    action: "CREATE_PRODUCT",
    data: req.body,
  });

  res.json(response);
});

module.exports = router;

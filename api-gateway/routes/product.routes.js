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

router.get("/", async (req, res) => {
  const response = await req.app.locals.rpcClient.send(PRODUCT_QUEUE, {
    action: "GET_PRODUCT",
    data: req.query,
  });

  res.json(response);
});

router.get("/:id", async (req, res) => {
  const response = await req.app.locals.rpcClient.send(PRODUCT_QUEUE, {
    action: "GET_PRODUCT_BY_ID",
    data: req.params.id,
  });

  res.json(response);
});

router.put("/:id", async (req, res) => {
  const response = await req.app.locals.rpcClient.send(PRODUCT_QUEUE, {
    action: "UPDATE_PRODUCT",
    data: { id: req.params.id, ...req.body },
  });

  res.json(response);
});

router.delete("/:id", async (req, res) => {
  const response = await req.app.locals.rpcClient.send(PRODUCT_QUEUE, {
    action: "DELETE_PRODUCT",
    data: req.params.id,
  });

  res.json(response);
});

module.exports = router;

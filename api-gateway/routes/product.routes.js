const router = require("express").Router();

const { PRODUCT_QUEUE } = require("../rabbitmq/rabbitmq");
const { accessTokenMiddleware, hasRoleCheck } = require("../utils/tokenHelper");

router.use(accessTokenMiddleware);

// Create Product
router.post("/", async (req, res) => {
  const data = {
    userId: req.user.id,
    body: req.body,
  };
  const response = await req.app.locals.rpcClient.send(PRODUCT_QUEUE, {
    action: "CREATE_PRODUCT",
    data: data,
  });

  res.json(response);
});

router.get("/", async (req, res) => {
  const data = {
    userId: req.user.id,
    query: req.query,
  };
  const response = await req.app.locals.rpcClient.send(PRODUCT_QUEUE, {
    action: "GET_PRODUCT",
    data: data,
  });

  res.json(response);
});

router.get("/:id", async (req, res) => {
  const data = {
    userId: req.user.id,
    productId: req.params.id,
  };
  const response = await req.app.locals.rpcClient.send(PRODUCT_QUEUE, {
    action: "GET_PRODUCT_BY_ID",
    data: data,
  });

  res.json(response);
});

router.put("/:id", async (req, res) => {
  const data = {
    userId: req.user.id,
    productId: req.params.id,
    body: req.body,
  };
  const response = await req.app.locals.rpcClient.send(PRODUCT_QUEUE, {
    action: "UPDATE_PRODUCT",
    data: data,
  });

  res.json(response);
});

router.delete("/:id", async (req, res) => {
  const data = {
    userId: req.user.id,
    productId: req.params.id,
  };
  const response = await req.app.locals.rpcClient.send(PRODUCT_QUEUE, {
    action: "DELETE_PRODUCT",
    data: data,
  });

  res.json(response);
});

module.exports = router;

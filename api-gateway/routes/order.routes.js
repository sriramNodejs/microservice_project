const router = require("express").Router();

const { ORDER_QUEUE } = require("../rabbitmq/rabbitmq");
const { accessTokenMiddleware, hasRoleCheck } = require("../utils/tokenHelper");

// Create Product

router.post("/placeOrder", accessTokenMiddleware, async (req, res) => {
  const data = {
    id: req.user.id,
    body: req.body,
  };
  const response = await req.app.locals.rpcClient.send(ORDER_QUEUE, {
    action: "PLACE_ORDER",
    data,
  });

  res.json(response);
});

router.post("/user-orders", accessTokenMiddleware, async (req, res) => {
  const data = {
    id: req.user.id,
    query: req.query,
  };
  const response = await req.app.locals.rpcClient.send(ORDER_QUEUE, {
    action: "GET_USER_ORDERS",
    data,
  });

  res.json(response);
});

router.post("/user-order/:orderId", accessTokenMiddleware, async (req, res) => {
  const data = {
    orderId: req.params.id,
  };
  const response = await req.app.locals.rpcClient.send(ORDER_QUEUE, {
    action: "GET_ONE_USER_ORDER",
    data,
  });

  res.json(response);
});

router.post("/review", accessTokenMiddleware, async (req, res) => {
  const data = {
    userId: req.user.id,
    body: req.body,
  };
  const response = await req.app.locals.rpcClient.send(ORDER_QUEUE, {
    action: "ADD_REVIEW",
    data,
  });

  res.json(response);
});

router.put("/review/:id", accessTokenMiddleware, async (req, res) => {
  const data = {
    userId: req.user.id,
    reviewId: req.params.id,
    body: req.body,
  };
  const response = await req.app.locals.rpcClient.send(ORDER_QUEUE, {
    action: "UPDATE_REVIEW",
    data,
  });

  res.json(response);
});

router.get("/review/:id", accessTokenMiddleware, async (req, res) => {
  const data = {
    userId: req.user.id,
    reviewId: req.params.id,
  };
  const response = await req.app.locals.rpcClient.send(ORDER_QUEUE, {
    action: "GET_ONE_REVIEW",
    data,
  });

  res.json(response);
});

router.get("/review/:id", accessTokenMiddleware, async (req, res) => {
  const data = {
    userId: req.user.id,
  };
  const response = await req.app.locals.rpcClient.send(ORDER_QUEUE, {
    action: "GET_ALL_REVIEWS",
    data,
  });

  res.json(response);
});

module.exports = router;

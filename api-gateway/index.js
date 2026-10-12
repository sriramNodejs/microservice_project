const express = require("express");
require("dotenv").config();
const createRpcClient = require("./rabbitmq/rpcClient");

const PORT = process.env.PORT || 3000;

const { connectRabbitMQ } = require("./rabbitmq/rabbitmq");

const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const userRoutes = require("./routes/user.routes");
const fileUpload = require("express-fileupload");

const { connectRedis } = require("./redis/redis");

const path = require("path");

const app = express();

app.use(express.json());

app.use(fileUpload());

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, `${process.env.UPLOAD_FOLDER || "uploads"}`),
  ),
);

async function start() {
  await connectRabbitMQ();

  await connectRedis();

  const {
    authLimiter,
    generalLimiter,
    orderLimiter,
    productLimiter,
  } = require("./middlewares/rateLimiter");

  const rpcClient = await createRpcClient();

  // General rate limit
  app.use(generalLimiter);

  app.locals.rpcClient = rpcClient;

  app.use("/product", productLimiter, productRoutes);
  app.use("/auth", authLimiter, userRoutes);
  app.use("/order", orderLimiter, orderRoutes);

  app.use((err, req, res, next) => {
    console.error("[API Gateway Error]", err);
    res.status(err.statusCode || err.status || 500).json({
      success: false,
      message: err.message ?? "internal server error",
      ...(err.errorCode && {
        errorCode: err.errorCode,
      }),
    });
  });

  app.listen(PORT, () => {
    console.log(`[API Gateway] is running on ${PORT}`);
  });
}

start();

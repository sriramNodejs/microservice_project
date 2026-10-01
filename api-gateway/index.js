const express = require("express");
require("dotenv").config();
const createRpcClient = require("./rabbitmq/rpcClient");

const PORT = process.env.PORT || 3000;

const { connectRabbitMQ } = require("./rabbitmq/rabbitmq");

const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

async function start() {
  await connectRabbitMQ();

  const rpcClient = await createRpcClient();

  app.locals.rpcClient = rpcClient;

  app.use("/product", productRoutes);
  app.use("/users", userRoutes);
  app.use("/orders", orderRoutes);

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

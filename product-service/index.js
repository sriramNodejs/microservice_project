const express = require("express");
require("dotenv").config();

const { connectRabbitMQ, PRODUCT_QUEUE } = require("./rabbitmq/connection");
const createRpcServer = require("./rabbitmq/rpcServer");

const { dbConnect } = require("./utils/dbConnect");

const { productHandler } = require("./controller/product.controller");

const app = express();
const PORT = process.env.PORT || 3001;

async function start() {
  dbConnect();

  app.use(express.json());

  await connectRabbitMQ();

  await createRpcServer(PRODUCT_QUEUE, productHandler);

  app.get("/", (req, res) => {
    res.json({
      message: "Product Service is running",
    });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: "[Product Service] internal server error",
    });
  });

  app.listen(PORT, () => {
    console.log(`[Product Service] is running on ${PORT}`);
  });
}

start();

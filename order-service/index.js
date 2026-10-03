const express = require("express");
require("dotenv").config();

const { connectRabbitMQ, ORDER_QUEUE } = require("./rabbitmq/connection");
const createRpcServer = require("./rabbitmq/rpcServer");

const { dbConnect } = require("./utils/dbConnect");

const { orderHandler } = require("./controller/order.controller");

const app = express();
const PORT = process.env.PORT || 3003;

async function start() {
  dbConnect();

  app.use(express.json());

  await connectRabbitMQ();

  await createRpcServer(ORDER_QUEUE, orderHandler);

  app.get("/", (req, res) => {
    res.json({
      message: "Order Service is running",
    });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: "[Order Service] internal server error",
    });
  });

  app.listen(PORT, () => {
    console.log(`[Order Service] is running on ${PORT}`);
  });
}

start();

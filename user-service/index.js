const express = require("express");
require("dotenv").config();

const { connectRabbitMQ, USER_QUEUE } = require("./rabbitmq/connection");
const createRpcServer = require("./rabbitmq/rpcServer");

const { dbConnect } = require("./utils/dbConnect");

const { userHandler } = require("./controller/user.controller");

const app = express();
const PORT = process.env.PORT || 3002;

async function start() {
  dbConnect();

  app.use(express.json());

  await connectRabbitMQ();

  await createRpcServer(USER_QUEUE, userHandler);

  app.get("/", (req, res) => {
    res.json({
      message: "User Service is running",
    });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: "[User Service] internal server error",
    });
  });

  app.listen(PORT, () => {
    console.log(`[User Service] is running on ${PORT}`);
  });
}

start();

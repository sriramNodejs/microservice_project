const amqp = require("amqplib");

let channel;
let connection;

const ORDER_QUEUE = "order_queue";

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URI);
    console.log("Rabbitmq Connected");
    channel = await connection.createChannel();

    return channel;
  } catch (error) {
    console.error(`error in connecting rabbitmq`, error);
  }
}

module.exports = {
  connectRabbitMQ,
  getChannel: () => channel,
  ORDER_QUEUE,
};

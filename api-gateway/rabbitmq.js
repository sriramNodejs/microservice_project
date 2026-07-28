const amqp = require("amqplib");

let channel;
let connection;

const PRODUCT_QUEUE = "product_queue";
const ORDER_QUEUE = "order_queue";
const USER_QUEUE = "user_queue";

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URI);
    console.log("Rabbitmq Connected");
    channel = await connection.createChannel();

    await channel.assertQueue(PRODUCT_QUEUE);
    await channel.assertQueue(ORDER_QUEUE);
    await channel.assertQueue(USER_QUEUE);

    return channel;
  } catch (error) {
    console.error(`error in connecting rabbitmq`, error);
  }
}

module.exports = {
  connectRabbitMQ,
  getChannel: () => channel,
  PRODUCT_QUEUE,
  ORDER_QUEUE,
  USER_QUEUE,
};

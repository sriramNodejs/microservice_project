const amqp = require("amqplib");

let channel;
let connection;

const USER_QUEUE = "user_queue";

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
  USER_QUEUE,
};

const { getChannel } = require("./rabbitmq");
const { createBufferData } = require("../utils/helpers");

async function createRpcServer(queueName, handler) {
  const channel = getChannel();

  await channel.assertQueue(queueName, { durable: false });

  channel.consume(queueName, async (msg) => {
    const request = JSON.parse(msg.content.toString());

    const response = await handler(request);

    channel.sendToQueue(msg.properties.replyTo, createBufferData(response), {
      coorelationId: msg.properties.coorelationId,
    });

    channel.ack(msg);
  });
}

module.exports = createRpcServer;

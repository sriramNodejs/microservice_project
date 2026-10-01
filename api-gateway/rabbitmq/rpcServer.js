const { getChannel } = require("./rabbitmq");
const { createBufferData } = require("../utils/helpers");

async function createRpcServer(queueName, handler) {
  const channel = getChannel();

  await channel.assertQueue(queueName, { durable: true });

  channel.consume(queueName, async (msg) => {
    const request = JSON.parse(msg.content.toString());

    const response = await handler(request);

    channel.sendToQueue(msg.properties.replyTo, createBufferData(response), {
      correlationId: msg.properties.correlationId,
    });

    channel.ack(msg);
  });
}

module.exports = createRpcServer;

const { randomUUID } = require("crypto");
const { getChannel } = require("./rabbitmq");
const { createBufferData } = require("../utils/helpers");

const pendingRequests = {};

// await channel.assertQueue(PRODUCT_QUEUE);
// await channel.assertQueue(ORDER_QUEUE);
// await channel.assertQueue(USER_QUEUE);

async function createRpcClient() {
  const channel = getChannel();

  const q = await channel.assertQueue("", { exclusive: true });
  channel.consume(
    q.queue,
    (msg) => {
      const coorelationId = msg.properties.coorelationId;
      if (pendingRequests[coorelationId]) {
        pendingRequests[coorelationId](msg.content.toString());
        delete pendingRequests[coorelationId];
      }
    },
    {
      noAck: true,
    },
  );

  return {
    send: (queue, message) => {
      return new Promise((resolve) => {
        const coorelationId = randomUUID();
        pendingRequests[coorelationId] = resolve;

        channel.sendToQueue(queue, createBufferData(message), {
          coorelationId,
          replyTo: q.queue,
        });
      });
    },
  };
}

module.exports = createRpcClient;

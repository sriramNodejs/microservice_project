const { randomUUID } = require("crypto");
const { getChannel } = require("./rabbitmq");
const { createBufferData, parseRpcResponse } = require("../utils/helpers");

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
      if (!msg) return;
      const correlationId = msg.properties.correlationId;

      const pending = pendingRequests[correlationId];
      if (!pending) return;

      const response = parseRpcResponse(msg);

      if (response.success === false) {
        const error = new Error(response.message);
        error.errorCode = response.errorCode;
        error.statusCode = response.statusCode || 500;
        pending.reject(error);
      } else {
        pending.resolve(response);
      }
      delete pendingRequests[correlationId];
    },
    {
      noAck: true,
    },
  );

  return {
    send: (queue, message) => {
      return new Promise((resolve, reject) => {
        const correlationId = randomUUID();
        pendingRequests[correlationId] = {
          resolve,
          reject,
        };

        channel.sendToQueue(queue, createBufferData(message), {
          correlationId,
          replyTo: q.queue,
          contentType: "application/json",
        });
      });
    },
  };
}

module.exports = createRpcClient;

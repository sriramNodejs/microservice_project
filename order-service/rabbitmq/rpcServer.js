const { getChannel } = require("./connection");
const { createBufferData, parseRpcResponse } = require("../utils/helpers");

async function createRpcServer(queueName, handler) {
  const channel = getChannel();

  await channel.assertQueue(queueName, { durable: true });

  channel.consume(queueName, async (msg) => {
    if (!msg) return;

    const correlationId = msg.properties.correlationId;
    const replyTo = msg.properties.replyTo;

    try {
      const request = parseRpcResponse(msg);
      const response = await handler(request);

      channel.sendToQueue(replyTo, createBufferData(response), {
        correlationId,
        contentType: "application/json",
      });
    } catch (error) {
      console.error(`[RPC Error] ${queueName}:`, error);

      const errorResponse = {
        success: false,
        message: error.isOperational ? error.message : "Internal server error",
      };

      if (error.errorCode) {
        errorResponse.errorCode = error.errorCode;
      }

      channel.sendToQueue(replyTo, createBufferData(errorResponse), {
        correlationId,
        contentType: "application/json",
      });
    } finally {
      channel.ack(msg);
    }
  });
}

module.exports = createRpcServer;

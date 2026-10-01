const createBufferData = (data) => {
  return Buffer.from(JSON.stringify(data));
};

function parseRpcResponse(msg) {
  const content = msg.content.toString();

  try {
    return JSON.parse(content);
  } catch {
    return content;
  }
}

module.exports = {
  createBufferData,
  parseRpcResponse,
};

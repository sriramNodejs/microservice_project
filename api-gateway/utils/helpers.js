const createBufferData = (data) => {
    return Buffer.from(JSON.stringify(data));
}

module.exports = {
    createBufferData
}
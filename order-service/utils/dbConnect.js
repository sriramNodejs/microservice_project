const MONGO_URI = process.env.MONGO_URI;
const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(`[Order service] is connected to Mongodb Successfully`);
    })
    .catch((err) => {
      console.log(`[Order Service] Error in connecting Database`, err);
    });
};

module.exports = {
  dbConnect,
};

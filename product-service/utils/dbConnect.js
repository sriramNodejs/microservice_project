const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(MONGO_URI).then(() => {
        console.log(`[Product service] is connected to Mongodb Successfully`)
    }).catch((err) => {
        console.log(`[Product Service] Error in connecting Database`, err)
    })
}

module.exports = {
    dbConnect
}
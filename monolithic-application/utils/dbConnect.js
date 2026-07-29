const MONGO_URI = process.env.MONGO_URI;
const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(MONGO_URI).then(() => {
        console.log(`Server is connected to Mongodb Successfully`)
    }).catch((err) => {
        console.log(`Server Error in connecting Database`, err)
    })
}

module.exports = {
    dbConnect
}
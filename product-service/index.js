const express = require('express');
require('dotenv').config();
const { dbConnect } = require("./utils/dbConnect");

const app = express();
const PORT = process.env.PORT || 3001;

dbConnect();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Product Service is running'
    })
})


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success:false, 
        message: '[Product Service] internal server error'
    })
})


app.listen(PORT, () => {
    console.log(`[Product Service] is running on ${PORT}`)
})
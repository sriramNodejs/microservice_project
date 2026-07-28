const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const { connectRabbitMQ, getChannel, ORDER_QUEUE, PRODUCT_QUEUE, USER_QUEUE } = require('./rabbitmq');
const {createBufferData} = require('./utils/helpers')

const app = express();

app.use(express.json()); 

connectRabbitMQ();


app.post('/products', async(req, res) => {
    const channel = getChannel();

    channel.sendToQueue(PRODUCT_QUEUE, createBufferData(req.body))

    res.json({
        message: 'Send to Product Service'
    })
})

app.post('/orders', async(req, res) => {
    const channel = getChannel();

    channel.sendToQueue(ORDER_QUEUE, createBufferData(req.body))

    res.json({
        message: 'Send to Order Service'
    })
})

app.post('/users', async(req, res) => {
    const channel = getChannel();

    channel.sendToQueue(USER_QUEUE, createBufferData(req.body))

    res.json({
        message: 'Send to Order Service'
    })
})



app.listen(PORT, () => {
    console.log(`[API Gateway] is running on ${PORT}`)
})
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();


app.use(express.json());

app.use('/auth', userRoutes)


// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success:false,
        message: err.message || 'internal server error'
    })
})

module.exports = app;
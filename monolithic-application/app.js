const express = require("express");
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addressRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json());

app.use("/auth", userRoutes);
app.use("/address", addressRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

app.get("/orders", (req, res, next) => {
  res.send(`
    <h1>Your orders</h1>
`);
});

app.get("/cart", (req, res, next) => {
  res.send(`
    <h1>Your Cart here</h1>
`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "internal server error",
  });
});

module.exports = app;

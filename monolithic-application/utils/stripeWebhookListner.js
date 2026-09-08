const stripe = require("./stripe");
const Order = require("../models/Order");
const Product = require("../models/Product");

const stripeWebhookListner = async (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  let paymentIntent = event.data.object;
  const orderId = paymentIntent.metadata.order_id;

  if (!orderId) {
    console.log("order id is missing");
  }

  console.log(event.type);

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      console.log(orderId, "order id");
      await Order.updateOne({ _id: orderId }, { status: "confirmed" });
      // you can send mail

      break;

    case "payment_intent.payment_failed":
      console.log(
        event.data.object.last_payment_error.decline_code,
        "decline reason",
      );

      const orderData = await Order.findByIdAndUpdate(
        { _id: orderId },
        { status: "payment_failed" },
      );

      const { productId, quantity } = orderData;

      await Product.updateOne(
        { _id: productId },
        { $inc: { stock: quantity } },
      );

      // you can send mail for payment failed

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
};

module.exports = stripeWebhookListner;

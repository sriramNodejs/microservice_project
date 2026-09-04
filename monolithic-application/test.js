require("dotenv").config();
const stripeKey = process.env.STRIPE_SECRET_KEY;
const { dbConnect } = require("./utils/dbConnect");

dbConnect();

const stripe = require("stripe")(stripeKey);
const User = require("./models/User");

async function createStripeUsers() {
  //   const users = await User.find({
  //     stripeCustomerId: { $exists: false, $ne: null },
  //   });

  const users = await User.find({ stripeCustomerId: { $eq: null } });
  console.log(users);

  const userPromises = [];

  for (const user of users) {
    console.log("Creating stripe user for", user.email);
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
    });
    user.stripeCustomerId = customer.id;
    userPromises.push(user.save());
  }

  const data = await Promise.allSettled(userPromises);

  console.log(data);
}

createStripeUsers();

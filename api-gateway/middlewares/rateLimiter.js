const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const { redisClient } = require("../redis/redis");


const createLimiter = ({ windowMs, max }) => {
  return rateLimit({
    windowMs,
    max,

    standardHeaders: "draft-8",
    legacyHeaders: false,

    store: new RedisStore({
      sendCommand: (...args) => redisClient.sendCommand(args),
    }),

    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  });
};

const generalLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 100,
});

const authLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 100,
});

const productLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 100,
});

const orderLimiter = createLimiter({
  windowMs: 60 * 1000,
  max: 100,
});


module.exports = {
  generalLimiter,
  authLimiter,
  productLimiter,
  orderLimiter,
};

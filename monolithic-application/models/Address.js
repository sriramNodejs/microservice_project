const { Schema, model } = require("mongoose");

const addressSchema = new Schema(
  {
    houseNo: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine2: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine3: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pinCode: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },

    addressType: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },
  },
  {
    timestamps: true,
  },
);

const Address = model("address", addressSchema);
module.exports = Address;

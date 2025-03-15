const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    name: String,
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
    email: String,
    state: String,
    landmark: String,
    alternatePhone: String,
    deliveryType: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);

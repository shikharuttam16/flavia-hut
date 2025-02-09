require("dotenv").config();

const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );
  } catch (err) {}
}

module.exports = connectDB;

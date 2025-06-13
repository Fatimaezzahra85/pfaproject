const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  amount: Number,
  time: Date
});

module.exports = mongoose.model("Bid", bidSchema);

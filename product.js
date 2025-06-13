const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  cathegory: String,
  startingPrice: Number,
  currentPrice: Number,
  auctionEnd: Date,

 
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
  highestBid: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" }
});



module.exports = mongoose.model('product', productSchema);

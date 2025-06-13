const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
cathegory: String,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
  bids: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    amount: Number,
    start_time: Date,
    end_time: Date,
    bid_increment: Number
  }],
});

module.exports = mongoose.model('auction', auctionSchema);

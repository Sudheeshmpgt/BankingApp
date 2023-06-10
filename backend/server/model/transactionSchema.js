const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Account',
    required: true,
  },
  createdAt: {
    type: Number,
    default: 0,
    required: true,
  },
  amount: {
    type: Number, 
    required: 0,
  },
  credit: {
    type: Boolean,
    default: false,
    required: true
  },
  debit: {
    type: Boolean,
    default: false,
    required: true
  },
  details: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
    required: true
  }
});

module.exports = TransactionModel = mongoose.model("Transaction", transactionSchema);
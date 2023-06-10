const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    accountId:{
        type: String,
        unique: true,
        required: true,
    },
    balance: {
        type: Number,
        default:0,
        required: true,
    },
});

module.exports = AccountModel = mongoose.model("Account", accountSchema);
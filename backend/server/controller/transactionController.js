const AccountModel = require("../model/accountSchema");
const TransactionModel = require("../model/transactionSchema");

const deposit = async (req, res) => {
  try {
    let {userId, accountId, amount} = req.body
    if(!userId || !accountId || !amount) throw new Error('Missing required fields');
    let filter = {userId: userId}
    let update = {$inc: {balance: Number(amount)}}
    let account = await AccountModel.findOneAndUpdate(filter, update, { new: true }) 
    if(account){
      let transaction = TransactionModel({
        userId: userId,
        accountId: accountId,
        createdAt: Date.now(),
        amount: Number(amount),
        credit: true,
        details: 'Deposit',
        balance: Number(account.balance)
      })
      let newTransaction = await transaction.save();
      res.status(200).send({error:false, success:true, message:"Deposit successfull", account:account, transaction:newTransaction})
    }else{
      res.status(200).send({error:true, success:false, message:"Transaction failed"})
    }
  } catch (error) {
    res.status(500).json({ error:true, success: false, message:error.message });
  }
};

const withdraw = async (req, res) => {
  try {
    let {userId, accountId, amount} = req.body
    if(!userId || !accountId || !amount) throw new Error('Missing required fields');
    let filter = {userId: userId}
    let update = {$inc: {balance: -Number(amount)}}
    let account = await AccountModel.findOneAndUpdate(filter, update, { new: true }) 
    if(account){
      let transaction = TransactionModel({
        userId: userId,
        accountId: accountId,
        createdAt: Date.now(),
        amount: Number(amount),
        debit: true,
        details: 'Withdraw',
        balance: Number(account.balance)
      })
      let newTransaction = await transaction.save();
      res.status(200).send({error:false, success:true, message:"Withdraw successfull", account:account, transaction:newTransaction})
    }else{
      res.status(200).send({error:true, success:false, message:"Transaction failed"})
    }
  } catch (error) {
    res.status(500).json({ error:true, success: false, message:error.message });
  }
};

const transfer = async (req, res) => {
  try {
    let {userId, accountId, amount, transferEmail} = req.body
    if(!userId || !accountId || !amount) throw new Error('Missing required fields');
    let transferAccount = await AccountModel.findOne({accountId: transferEmail})
    let userAccount = await AccountModel.findOne({userId: userId})
    if(!userAccount?._id) throw new Error('User Account not found')
    if(!transferAccount?._id ) throw new Error('Transfer account not found ')
    if(userAccount.balance < amount){
      res.status(200).send({error:true, success:false, message:"Insuficient account balance"})
    }else{
      let transferFilter = {userId: transferAccount.userId}
      let transferUpdate = {$inc: {balance: Number(amount)}}
      transferAccount = await AccountModel.findOneAndUpdate(transferFilter, transferUpdate, { new: true }) 
      let userFilter = {userId: userId}
      let userUpdate = {$inc: {balance: -Number(amount)}}
      userAccount = await AccountModel.findOneAndUpdate(userFilter, userUpdate, { new: true }) 
      if(transferAccount && userAccount){
        let userTransaction = TransactionModel({
          userId: userId,
          accountId: accountId,
          createdAt: Date.now(),
          amount: Number(amount),
          debit: true,
          details: `Transfer to ${transferAccount.accountId}`,
          balance: Number(userAccount.balance)
        })
        let newUserTransaction = await userTransaction.save();
        let transferTransaction = TransactionModel({
          userId: transferAccount.userId,
          accountId: transferAccount._id,
          createdAt: Date.now(),
          amount: Number(amount),
          credit: true,
          details: `Transfer from ${userAccount.accountId}`,
          balance: Number(transferAccount.balance)
        })
        let newTransferTransaction = await transferTransaction.save();
        res.status(200).send({
          error:false, 
          success:true, 
          message:"Transfer successfull", 
          user:userAccount, 
          userTransaction:newUserTransaction,
          transfer:transferAccount, 
          transferTransaction:newTransferTransaction
        })
      }else{
        res.status(200).send({error:true, success:false, message:"Transaction failed"})
      }
    }
  } catch (error) {
    res.status(500).json({ error:true, success: false, message:error.message });
  }
};

const getAccount = async (req, res) => {
  try {
      let userId = req.params.userId
      if(!userId) throw new Error("User not found")
      let account = await AccountModel.findOne({userId:userId})
      if(account){
        res.status(200).json({error:false, success:true, message:"Success", data:account })
      }else{
        res.status(200).json({error:true, success:false, message:"Account not found"})
      }
  } catch (error) {
      res.status(500).json({error:true, success: false, message:error.message});
  }
}

const getAllTransactions = async (req, res) => {
    try {
        let userId = req.query.userId
        if(!userId) throw new Error("User not found")
        let skip = req.query.skip 
        let limit = req.query.limit
        let transaction
        if(!skip || !limit){
          transaction = await TransactionModel.find({userId:userId}).sort({createdAt:1})
        }else{
          transaction = await TransactionModel.find({userId:userId}).sort({createdAt:1}).skip(skip).limit(limit)
        }
        let total = await TransactionModel.find({userId:userId}).count()
        if(transaction?.length){
          res.status(200).json({error:false, success:true, message:"Success", data:transaction, total:total })
        }else{
          res.status(200).json({error:true, success:false, message:"Account not found"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { deposit, withdraw, transfer, getAccount, getAllTransactions };

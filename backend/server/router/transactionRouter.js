const route = require('express').Router()
const {deposit, withdraw, transfer, getAccount, getAllTransactions} = require('../controller/transactionController')
const verifyAuth = require('../middleware/authenticate')

route.put('/deposit', verifyAuth, deposit);
route.put('/withdraw', verifyAuth, withdraw);
route.put('/transfer', verifyAuth, transfer);
route.get('/transaction/all', verifyAuth, getAllTransactions);
route.get('/get/:userId', verifyAuth, getAccount);

module.exports = route;
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 9000;       

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());   

require('./server/database/database')();


app.use('/api/user', require('./server/router/userRouter'))
app.use('/api/account', require('./server/router/transactionRouter'))


const server = app.listen(PORT, () => { 
    console.log("Server started at http://localhost:9000");
})
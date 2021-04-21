const db = require("../models/index");
const User =db.user;
const Transactions = db.transactions;





exports.createNewTransaction=(req, res)=>{
const reqBody =req.body;
User.findOne({
    where:{email: reqBody.email}
}).then(user=>{
    Transactions.create({
        username:reqBody.username,
        email: reqBody.email,
        phonenumber:reqBody.phonenumber,
        transactionid:reqBody.transactionid,
        transaction_ref:reqBody.transaction_ref,
        amount: reqBody.amount,
        currency: reqBody.currency,
        payment_type: reqBody.payment_type,
        status: reqBody.status,
        transactiondate: reqBody.transactiondate,
        }).then(transaction=>{
            transaction.setUsers(user)
            .then(()=>{
                return res.status(200).send({message: 'Transaction Completed Sucesffully'})
            }).catch(error=>{
                console.log(error.message)
                return res.status(200).send({message: 'Transaction Failed'})
            })
            
        }).catch(error=>{
            console.log(error.message)
            return res.status(200).send({message: 'Transaction Failed'})
        })
})
}
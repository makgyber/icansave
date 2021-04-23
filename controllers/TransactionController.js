const { isNullOrEmpty } = require("../CustomFunctions/CustomFunctions");
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

exports.submitDeposit=(req, res)=>{
    if(isNullOrEmpty(req.body.email) || req.body.email==undefined){
        return res.status(500).send({message: 'Email is empty'})  
    }
    if(isNullOrEmpty(req.body.amount) || req.body.amount==undefined){
        return res.status(500).send({message: 'Amount was not specified'})  
    }
    if(isNullOrEmpty(req.file) || req.file==undefined){
        return res.status(500).send({message: 'Kindly upload receipt of payment'})  
    }
    const reqBody =req.body;
    User.findOne({
        where: {email: reqBody.email}
    }).then(user=>{
       if(!user){
        return res.status(500).send({message: 'User with '+reqBody.email+' not found' })
       } 
       Transactions.create({
        amount: reqBody.amount,
        currency: 'php',
        type: 'deposit', 
        slip: req.file.originalname,
        status: 'Pending',
        }).then(transaction=>{
            transaction.setUser(user)
            .then(()=>{
                return res.status(200).send({message: 'Transaction Submitted Successfully'})
            }).catch(error=>{
                console.log(error.message)
                return res.status(500).send({message: 'Transaction Failed'})
            }) 
        }).catch(error=>{
            console.log(error.message)
            return res.status(500).send({message: 'Transaction Failed'})
        })
    })
}

exports.submitWithdrawalRequest=(req, res)=>{
    if(isNullOrEmpty(req.body.email) || req.body.email==undefined){
        return res.status(500).send({message: 'Email is empty'})  
    }
    if(isNullOrEmpty(req.body.amount) || req.body.amount==undefined){
        return res.status(500).send({message: 'Amount was not specified'})  
    }
    const reqBody =req.body;
    User.findOne({
        where: {email: reqBody.email}
    }).then(user=>{
        console.log(user)
       if(!user){
        return res.status(500).send({message: 'User with '+reqBody.email+' not found' })
       } 
       Transactions.findAll({
           where:{userId: user.id, type:'depo'}
       }).then(trans=>{
           if(trans.length){
            Transactions.create({
                amount: reqBody.amount,
                currency: 'php',
                type: 'withdrawal', 
                status: 'Pending',
                }).then(transaction=>{
                    transaction.setUser(user)
                    .then(()=>{
                        return res.status(200).send({message: 'Withdrawal Request Submitted Successfully'})
                    }).catch(error=>{
                        console.log(error.message)
                        return res.status(500).send({message: 'Withdrawal Request Failed'})
                    }) 
                }).catch(error=>{
                    console.log(error.message)
                    return res.status(500).send({message: 'Withdrawal Request Failed'})
                })
           }else{
            return res.status(500).send({message: 'Account balance is insufficient. Please save inorder to withdrawal'}) 
           }
       }).catch(error=>{
        console.log(error.message)
        return res.status(500).send({message: 'Withdrawal failed. Insufficient balance'})
    })
       
    })
}

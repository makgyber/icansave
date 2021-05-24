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
       if(user && user.status==='Pending' ){
        return res.status(500).send({message: "Your account is pending approval. You will be able to transact when your account is approved"})
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
       if(user && user.status==='Pending' ){
        return res.status(500).send({message: "Your account is pending approval. You will be able to transact when your account is approved"})
    }
       Transactions.findAll({
           where:{userId: user.id, type:'deposit'}
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
exports.getAllTransactions=(req, res)=>{
    var sum =0
    var withds =0
    Transactions.findAll({include:[User]})
    .then(transactions=>{
        const allwithdrawals=[]
for(let i=0; i<transactions.length; i++){
    if(transactions[i].type==='deposit' && transactions[i].status==='Verified'){
        sum +=parseInt(transactions[i].amount, 0)
    }
    
    if(transactions[i].type==='withdrawal' && transactions[i].status==='Verified'){
        
        withds +=parseInt(transactions[i].amount, 0)
    }
    if(transactions[i].type==='withdrawal' ){
        allwithdrawals.push(transactions[i])
    }
}
  return res.status(200).send({totaltransactions: sum+withds ,sums: sum, withd: withds, all: transactions, allwithdrawals: allwithdrawals})
    }).catch(error=>{
        console.log(error.message)
        return res.status(500).send({message: 'An error Occured'})
    })
}

exports.getRecentTransactions=(req, res)=>{
    Transactions.findAll({ include:[User], order: [['createdAt', 'DESC']], limit:5
}, ).then(response=>{
    //console.log(response)
    return res.status(200).send(response)
}).catch(error=>{
    console.log(error.message)
    return res.status(500).send({message: 'An error Occured'})
})
}


exports.approveOrRevokeTransaction=(req, res)=>{
    if(isNullOrEmpty(req.body.trid) || req.body.trid==undefined){
        return res.status(500).send({
            message: isNullOrEmpty(req.body.trid)?'Value is empty': 
            req.body.trid==undefined? 'Parameter missing completely':''
        }) 
    }
    Transactions.findOne({
        where:{id: req.body.trid}
    }).then(transaction=>{
        if(!transaction){
            return res.status(500).send({message: 'Invalid User'}) 
        }
        if(transaction.status==='Pending'){
            Transactions.update({
                status: 'Verified'
            },{ where:{id: transaction.id}})
            .then(()=>{
                return res.status(200).send({message: 'Transaction Verified Successfully'})
            }).catch(error=>{
                console.log(error.message)
                return res.status(500).send({message: 'Operation failed'}) 
            })
        }
        if(transaction.status==='Verified'){
            Transactions.update({
                status: 'Pending'
            },{ where:{id: transaction.id}})
            .then(()=>{
                return res.status(200).send({message: 'Transaction Verifcation rollback was Successfull'})
            }).catch(error=>{
                console.log(error.message)
                return res.status(500).send({message: 'Operation failed'}) 
            })
        }
    }).catch(error=>{
        console.log(error.message)
        return res.status(500).send({message: 'Operation failed'}) 
    })
}
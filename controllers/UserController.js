const db = require("../models/index");
const User =db.user;
const sseExpress = require('sse-express');
const { isNullOrEmpty } = require("../CustomFunctions/CustomFunctions");
const Account =db.account;
const Transactions=db.transactions;
exports.getAllUsers=( req, res)=>{
  User.findAll()
  .then(users=>{
    res.status(200).send(users)
  }).catch(error=>{
      console.log(error.message);
      return res.status(500).send(users)
  }) 
}

exports.generateSavingsAccount=(req, res)=>{
    if(isNullOrEmpty(req.body.email) || req.body.email==undefined){
        return res.status(500).send({
            message: isNullOrEmpty(req.body.userid)?'Value is empty': 
            req.body.userid==undefined? 'Parameter missing completely':''
        }) 
    }
    const data =req.body;
    const sequence = {id: "901"};
   User.findOne({
       where:{email: data.email}
   }).then(user=>{
       if(!user){
        return res.status(404).send({ message: "User not found" })   
       }
       if(user.accountId!==null){
        return res.status(500).send({ message: "User Has account already" })   
       }
       Account.create({
        accountname: (user.fullname).toUpperCase(),
        accountnumber: sequence.id+(Math.floor(1000000000+ Math.random()*9000000000)),
        status: 1,
        createdBy: 1
    }).then(account=>{
        user.accountId=account.id;
          if(user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          })){
            return res.status(200).send({ message: "Account Created Successfully" })  
          }
    }).catch(error=>{
        console.log(error.message)
        return res.status(500).send({ message: error.message })   
    })
   }).catch(error=>{
       console.log(error.message)
    return res.status(500).send({ message: error.message })   
})

}


exports.deactivateOrActivateuser=(req, res)=>{
    if(isNullOrEmpty(req.body.userid) || req.body.userid==undefined){
        return res.status(500).send({
            message: isNullOrEmpty(req.body.userid)?'Value is empty': 
            req.body.userid==undefined? 'Parameter missing completely':''
        }) 
    }
    User.findOne({
        where:{id: req.body.userid}
    }).then(user=>{
        if(!user){
            return res.status(500).send({message: 'Invalid User'}) 
        }
        if(user.status==='Pending'){
            User.update({
                staus: 'Active'
            },{ where:{id: user.id}})
            .then(()=>{
                return res.status(200).send({message: 'User activated Successfully'})
            }).catch(error=>{
                console.log(error.message)
                return res.status(500).send({message: 'Operation failed'}) 
            })
        }
        if(user.status==='Active'){
            User.update({
                staus: 'Pending'
            },{ where:{id: user.id}})
            .then(()=>{
                return res.status(200).send({message: 'User deactivated Successfully'})
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

exports.getAccountInformation=(req, res)=>{
    let accountArray={}
    User.findOne({
        where: {email: req.body.email}, include:[Account]
    }).then(user=>{
        Transactions.findAll({
            where: {userId: user.id}
        }).then(usertransactions=>{
            let current =0; let withdraw=0;
            for(let i=0; i<usertransactions.length; i++){
                if(usertransactions[i].type==='deposit'){
                    current+=(parseFloat(usertransactions[i].amount, 3))
                }
                if(usertransactions[i].type==='withdrawal'){
                    withdraw+=(parseFloat(usertransactions[i].amount, 3))
                }
            }
            var total =current-withdraw;
            accountArray={
                accountname: user.saving_account.accountname,
                accountnumber: user.saving_account.accountnumber,
                currentbalance: total,
                createdAt: user.saving_account.createdAt,
            }
            return res.status(200).send({
                transactions: usertransactions,
                accountinfromation: accountArray
            })
        }).catch(error=>{
            console.log(error.message)
            return res.status(500).send({message: error.message}) 
        })
        
    }).catch(error=>{
        console.log(error.message)
        return res.status(500).send({message: error.message}) 
    })
}



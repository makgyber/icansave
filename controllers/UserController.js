const db = require("../models/index");
const User =db.user;
const sseExpress = require('sse-express');
const { isNullOrEmpty } = require("../CustomFunctions/CustomFunctions");
const Account =db.account;
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
    const data =req.body;
    if(isNullOrEmpty(data.userid)){
        return res.status(500).send({ message: "An error occured" }) 
    }
    const sequence = {id: "901"};
    Account.create({
        userid: data.userid,
        accountname: (data.username).toUpperCase(),
        accountnumber: sequence.id+(Math.floor(1000000000+ Math.random()*9000000000)),
        status: 1,
        createdBy: data.createdby
    }).then(()=>{
        return res.status(200).send({ message: "Account Created Successfully" })   
    }).catch(error=>{
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
            user.status='Active';
            User.update({
                where:{id: user.id}
            })
            .then(()=>{
                return res.status(200).send({message: 'User activated Successfully'})
            }).catch(error=>{
                console.log(error.message)
                return res.status(500).send({message: 'Operation failed'}) 
            })
        }
        if(user.status==='Active'){
            user.status='Pending';
            User.update({
                where:{id: user.id}
            })
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



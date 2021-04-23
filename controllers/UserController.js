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




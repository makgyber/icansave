const db = require("../models/index");
const User =db.user;
const Account =db.account;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
exports.registrationRequest=(req, res)=>{
    const reqBody=req.body;
    User.create({
      username:reqBody.username,
      fullname: reqBody.fullname,
      email: reqBody.email,
      mobilenumber: reqBody.mobilenumber,
      idtype: reqBody.idtype,
      idnumber: reqBody.idnumber,
      password: bcrypt.hashSync(reqBody.password, 8),
      address: reqBody.address,
      province: reqBody.province,
      city: reqBody.city,
      barangay: reqBody.barangay,
      zipcode: reqBody.zipcode,
      civilstatus:reqBody.civilstatus,
      occupation: reqBody.occupation,
      companyname: reqBody.companyname,
      companyaddress: reqBody.companyaddress,
      companycontact: reqBody.companycontact,
      facebookprofile:  reqBody.facebookprofile,
      savingobjective: reqBody.savingobjective,
      targetsaving:reqBody.targetsaving,
      savingperiod: reqBody.savingperiod,
      periodicsavingamount: reqBody.periodicsavingamount,
      depositplan: reqBody.depositplan,
      usertype: 1,      
    }).then(registereduser=>{
        const sequence = {id: "901"};
        Account.create({
            accountname: (registereduser.fullname).toUpperCase(),
            accountnumber: sequence.id+(Math.floor(1000000000+ Math.random()*9000000000)),
            status: 1,
            createdBy: 1
        }).then(account=>{
            registereduser.accountId=account.id;
              if(registereduser.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
              })){
                return res.status(200).send({ message: "Account Created Successfully", data:registereduser })  
              }
        }).catch(error=>{
            console.log(error.message)
            return res.status(500).send({ message: 'Registration Failed' })   
        })
        //return res.status(200).send({message: 'Registration Successfull', data: registereduser})
    }).catch(error=>{
        console.log(error.message)
        return res.status(500).send({message: 'Registration Failed'})
    })
}

exports.loginRequest=(req, res)=>{
    const reqBody =req.body;
    if(reqBody.email !=="" &&  reqBody.password !==""){
        const hashedPassword = bcrypt.hashSync(reqBody.password, 8)
        
        User.findOne({
            where: {email: req.body.email}
        }).then(user=>{
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
              );
            if(!user ){
                return res.status(500).send({message: 'Wrong Credentials'})
            }
            if(user && user.status==='Pending' ){
                return res.status(500).send({message: `Your account is pending approval. 
                You will be able to login when your account is approved`})
            }
            if(!passwordIsValid){
                return res.status(500).send({message: 'Wrong Password'}) 
            }else{
                return res.status(200).send({message: 'Loggedin Sucessfully', data: user})
            }
            
        }).catch(error=>{
            console.log(error.message)
            return res.status(500).send({message: 'A error occured'})
        })
    }else{
        return res.status(500).send({message: 'Please fill all fields'})
    }
}
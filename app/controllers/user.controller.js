const db = require("../models/index");
const config = require("../config/auth.config");
const User = db.user;
const Savings =db.savings;
const Profile =db.profile;
const Gender = db.gender;
const MaritalStatus =db.maritalstatus;
const Titles =db.titles;
const Country =db.country;
const Role =db.role;
const Positions =db.position;
const Permissions=db.permission;
const Images =db.images;
const SavingsTargets =db.savingstargets;

const jwt = require("jsonwebtoken");
const {Op} =require('sequelize');
const { isNullOrEmpty, getModuleName, getSubModuleName, getProcessName, getPermissionName, capitaliseAndUnderscore } = require("../CustomFunctions/CustomFunctions");
const { uploadsPath, fileUploadsUrlPath } = require("../Enums");

exports.getCurrentUser=(req, res)=>{
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({message: "Failed"});
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "expired"
      });
    }
    req.userId = decoded.id;
    console.log(decoded)
    User.findOne({
      where: { id: req.userId }, include: [Role, Positions]
    }).then(user=>{
      if(user.positions.length>0){
      Positions.findOne({
        where: {id: user.positions[0].id}, include:[Permissions]
      }).then(permis=>{
        const processes =[];const permissions=[]; const subModules=[]; const userPermissions=[];
        for(let i=0; i<permis.permissions.length; i++){
          processes.push(capitaliseAndUnderscore(getProcessName(permis.permissions[i].process)));
          permissions.push(capitaliseAndUnderscore(getModuleName(permis.permissions[i].module)).toString()); 
          subModules.push(capitaliseAndUnderscore(getSubModuleName(permis.permissions[i].submodule))); 
          userPermissions.push({
            module: (getModuleName(permis.permissions[i].module).toUpperCase()),
            submodule: capitaliseAndUnderscore(getSubModuleName(permis.permissions[i].submodule)), 
            process:capitaliseAndUnderscore(getProcessName(permis.permissions[i].process)), 
            permission: capitaliseAndUnderscore(getPermissionName(permis.permissions[i].permission))}) 
        }
        
        res.status(200).send({
          userid: user.id,
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          image:  null ,
          imageid: null,
          telephone: user.telephone,
          dateofjoin: user.createdAt,
          userType: user.roles[0].user_roles.roleId,
          processes: processes,
          permissions: [{module:permissions  /*["ACCOUNTS"]*/}], 
          subModules: subModules,
          userpermissions: userPermissions,
          position: user.positions[0].id,
        });
      })
     
    }
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
  });
  
}

exports.getUserProfile=(req, res)=>{
  var idt = req.query;
  Profile.findOne({
    where: { userid: idt.id }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    };
    User.findOne({
      where: { id: user.userid }
    }).then(prof => {
      var credte = prof.createdAt;
      res.status(200).send({
        usernames: `${user.firstname}  ${user.lastname}`,
        dateofbirth: user.dateofbirth,
        address: user.address1,
        dateofjoin: credte,
      });
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
}



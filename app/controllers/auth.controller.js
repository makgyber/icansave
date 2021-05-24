const db = require("../models/index");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.checkUsernameAvailability=(req, res)=>{
  let available=false;
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user=>{
    if (!user) {
      available=true;
     return res.status(200).send({available: true});
    }else if(user){
      available=false;
      return res.status(200).send({available: false});
    }
  }).catch(error=>{
    return res.status(500).send(error.message);
  })
}


exports.checkEmailAvailability=(req, res)=>{
  let available=false;
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user=>{
    if (!user) {
      available=true;
     return res.status(200).send({available: true});
    }else if(user){
      available=false;
      return res.status(200).send({available: false});
    }
  }).catch(error=>{
    return res.status(500).send(error.message);
  })
}

exports.checkTelephoneAvailability=(req, res)=>{
  let available=false;
  User.findOne({
    where: {
      mobilenumber: req.body.mobilenumber
    }
  }).then(user=>{
    if (!user) {
      available=true;
     return res.status(200).send({available: true});
    }else if(user){
      available=false;
      return res.status(200).send({available: false});
    }
  }).catch(error=>{
    return res.status(500).send(error.message);
  })
}




exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    mobilenumber: req.body.mobilenumber,
    password: bcrypt.hashSync(req.body.password, 8),
    usertype:2
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      if (user && user.usertype==1) {
        return res.status(400).send({ message: "Kindly login using the mobile app" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          mobilenumber: user.mobilenumber,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};




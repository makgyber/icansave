const db = require("../models/index");
const User =db.user;
const sseExpress = require('sse-express');

exports.getAllUsers=( req, res)=>{
      res.sse('connected', {
    welcomeMsg: 'Hello world!',
  });
    setInterval(function() {
        User.findAll()
    .then(user=>{
        //for(let i=0; i<user.length; i++){
       res.sse('update', user
    //    {
    //     value: user,
    //     date: new Date(),
    //   }
      );
    //}
    }).catch(error=>{
         console.log(error.message);
    })
      }, 1000);
    
}


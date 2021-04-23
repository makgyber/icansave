const multer = require('multer') ;
const fs =require("fs");
const { uploadsPath } = require("../Enums");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.exists(uploadsPath, function(exists) {
        if (exists) {
         // next();
        }else{
          fs.mkdirSync(uploadsPath, {recursive: true})
        }
        return cb(null, uploadsPath);
      })
    },
    filename: function (req, file, cb) {
      if(file !=undefined){
        cb(null,file.originalname)
      }
    }
  });
  //mkdirp(dir, err => cb(err, dir))
  
const upload = multer({storage: storage});
const controller = require("../controllers/UserController");
const sseExpress = require('sse-express');
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Headers","x-access-token, Origin,X-Requested-With, Content-Type, Accept");
      //res.header("Access-Control-Allow-Origin", "http://localhost:8081");
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });

    //app.get('')

    app.get('/api/getAllUsers', controller.getAllUsers);
    app.post('/api/account/generateSavingsAccount', controller.generateSavingsAccount);
    
    
}
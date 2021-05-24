const controller = require("../controllers/FileUploadController");
const multer = require('multer') ;
const fs =require("fs");
const { uploadsPath } = require("../Enums");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdirSync(uploadsPath, {recursive: true})
        return cb(null, uploadsPath);
      
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname  )
    }
  });
  
const upload = multer({storage: storage});
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin,X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  

app.post('/api/uploadProfilePicture', upload.single('profilePicture'), 
controller.uploadProfilePic);
app.get('/api/removePicture', controller.removePicture);
app.get('/api/getAllImages', controller.getAllImages);
}
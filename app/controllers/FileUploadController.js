const { isNullOrEmpty } = require("../CustomFunctions/CustomFunctions");
const db = require("../models/index");
const fs=require('fs');
const Images =db.images;
const User =db.user;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { uploadsPath } = require("../Enums");
exports.uploadProfilePic = (req, res, next)=>{
    let token = req.headers["x-access-token"];
    console.log(token)
if(req.file===undefined){
    return res.status(500).send({message: "No file"})
}
jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "expired"
      });
    }
    req.userId = decoded.id;
    User.findOne({
        where: {id: req.userId}
    }).then(user=>{
        Images.create({
            imagename: req.file.originalname
        }).then(img=>{
           user.setImages(img); 
           return res.status(200).send(img);
        })
        .catch(error=>{
            return res.status(500).send({message: error.message})
        }) 
    })
})

}
exports.removePicture=(req, res)=>{
   const fileID=req.query.id;
    if(fileID===undefined){
        return res.status(500).send({message: "An error has occured"})
    }
    Images.findOne({
        where: {id: fileID}
    }).then(photo=>{
fs.unlinkSync(uploadsPath+photo.imagename, (error)=>{
if(error) throw error;
});
    }).then(()=>{
        Images.destroy({
            where: {id: fileID}
        }).then(()=>{
            return res.status(200).send({message: "Picture deleted successfully"})
        }).catch(error=>{
            return res.status(500).send({message: error.message})
        })
    })
    
}
exports.getAllImages=(req, res)=>{
    const allpics=[]
    Images.findAll()
    .then(img=>{
        for(let i=0; i<img.length; i++){
            allpics.push({
                id: img[i].id,
                name: img[i].imagename,
                url: uploadsPath+img[i].imagename
            })
        }
        return res.status(500).send(allpics)  
    }).catch(error=>{
        return res.status(500).send({message: error.message})
    })
}
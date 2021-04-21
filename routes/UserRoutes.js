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

    app.get('/updates', sseExpress, controller.getAllUsers);
    
}
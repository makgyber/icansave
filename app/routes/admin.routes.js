const { authJwt } = require("../middleware");
const controller = require("../controllers/admin.controller");

const sseExpress = require('sse-express');
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin,X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  //POST REQUESTS
  app.post("/api/perms/getPermissionsByPosition", controller.getPermissionsByPosition);
  //GET REQUESTS 
  app.get("/api/perms/getPositionPermisions", controller.getPositionPermisions);
  app.get("/api/positions/getPositions", controller.getPositions);
  app.get("/api/perms/getModulePermissions", controller.getModulePermissions);
  app.get("/api/perms/getModules", controller.getModules);
  app.get("/api/perms/getSubModules", controller.getSubModules);
  app.get("/api/perms/getProcesses", controller.getProcesses);
  app.get("/api/perms/getPermissions", controller.getPermissions);
  app.get("/api/positions/getUserPositions", controller.getUserPositions);
  app.get("/api/savings/getAllSavings", controller.getAllSavings);

  app.get("/api/users/getAllUsersFordash", controller.getAllUsersFordash);
  
  //SHARED ROUTES
  
  app.post("/api/permission/createPermission", controller.createPermission);
  app.post("/api/position/createPosition", controller.createPosition);
  app.post("/api/module/createModule", controller.createModule);
  app.post("/api/module/createSubModule", controller.createSubModule);
  app.post("/api/process/createProcess", controller.createProcess);
  app.post("/api/test/testFetch", controller.testFetch);
  app.post("/api/perms/savePositionPermissions", controller.savePositionPermissions);
  app.post("/api/perms/deletePositionPermission", controller.deletePositionPermission);
  app.post("/api/modules/createModule", controller.createModule);
  app.post("/api/perms/createPermission", controller.createPermission);
  app.post("/api/perms/saveUserPosition", controller.saveUserPosition);
  app.post("/api/perms/removeUserPosition", controller.removeUserPosition);

  
  app.get('/events', controller.eventsHandler);
  app.post('/fact', controller.addFacts);
  
  
};

const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.js")(sequelize, Sequelize);
db.role = require("./Role.js")(sequelize, Sequelize);
db.country=require("./Country")(sequelize, Sequelize);
db.account=require("./UserMgt/Account")(sequelize, Sequelize);
db.position=require("./Permission/Position")(sequelize, Sequelize);
db.module=require("./Permission/Module")(sequelize, Sequelize);
db.submodule =require("./Permission/SubModule")(sequelize, Sequelize);
db.permission =require("./Permission/Permissions")(sequelize, Sequelize);
db.processes=require("./Permission/Processes")(sequelize, Sequelize);
db.transactions=require("./Transactions")(sequelize, Sequelize);

//Module Permission relationship / relationship
db.module.belongsToMany(db.permission,{
  through: "module_permissions",
  foreignKey: "module_id",
  otherKey: "permission_id"
})
db.permission.belongsToMany(db.module,{
  through: "module_permissions",
  foreignKey: "permission_id",
  otherKey: "module_id"
})
//Position Permission relationship / relationship
db.position.belongsToMany(db.permission,{
  through: "position_permissions",
  foreignKey: "position_id",
  otherKey: "permission_id"
})
db.permission.belongsToMany(db.position,{
  through: "position_permissions",
  foreignKey: "permission_id",
  otherKey: "position_id"
})
//Processes user relationship/ asosciation
db.processes.belongsToMany(db.user,{
  through: "user_processes",
  foreignKey: "process_id",
  otherKey: "userId"
})
db.user.belongsToMany(db.processes,{
  through: "user_processes",
  foreignKey: "userId",
  otherKey: "process_id"
})
//Permission user relationship/ asosciation
db.permission.belongsToMany(db.user,{
  through: "user_permissions",
  foreignKey: "permission_id",
  otherKey: "userId"
})
db.user.belongsToMany(db.permission,{
  through: "user_permissions",
  foreignKey: "userId",
  otherKey: "permission_id"
})

//module submodule relationship/ asosciation
db.module.belongsToMany(db.submodule,{
  through: "module_submodules",
  foreignKey: "module_id",
  otherKey: "submodule_id"
})
db.submodule.belongsToMany(db.module,{
  through: "module_submodules",
  foreignKey: "submodule_id",
  otherKey: "module_id"
})
//user module relationship/ asosciation
db.module.belongsToMany(db.user,{
  through: "user_modules",
  foreignKey: "module_id",
  otherKey: "userId"
})
db.user.belongsToMany(db.module,{
  through: "user_modules",
  foreignKey: "userId",
  otherKey: "module_id"
})
//user position relationship/ asosciation
db.position.belongsToMany(db.user, {
  through: "user_position",
  foreignKey: "position_id",
  otherKey: "userId"
})
db.user.belongsToMany(db.position, {
  through: "user_position",
  foreignKey: "userId",
  otherKey: "position_id"
})

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId" 
});

db.user.belongsTo(db.account,{
  through: "saving_accounts",
  foreignKey: "accountId"
})
db.transactions.belongsTo(db.user,{
  through: "users",
  foreignKey: "userId"
})

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

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


const tablestoSync={};

tablestoSync.Sequelize = Sequelize;
tablestoSync.sequelize = sequelize;


tablestoSync.genders = require("./Gender.js")(sequelize, Sequelize);
tablestoSync.role = require("./Role.js")(sequelize, Sequelize);


module.exports = tablestoSync;

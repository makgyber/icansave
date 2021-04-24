const config = require("../config/db.js");

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

db.user =require("./User")(sequelize, Sequelize);
db.transactions=require("./Transactions")(sequelize, Sequelize);
db.account=require("./Account")(sequelize, Sequelize);

//Relationships
// db.user.belongsToMany(db.transactions, {
//   through: 'user_transactions',
//   foreignKey: 'userId',
//   otherKey: 'transactionId'
// });

// db.transactions.belongsToMany(db.user, {
//   through: 'user_transactions',
//   foreignKey: 'transactionId',
//   otherKey: ' userId'
// });
//db.transactions.belongsTo(db.user)


db.user.belongsTo(db.account,{
  through: "saving_accounts",
  foreignKey: "accountId"
})

db.transactions.belongsTo(db.user,{
  through: "users",
  foreignKey: "userId"
})


//db.user.belongsTo(db.account)
module.exports = db;
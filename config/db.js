module.exports = {
  // HOST: "157.230.82.8",
  // USER: "amvunidbadmin",
  // PASSWORD: "Amvuni@2021",
  

    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "icansave",
    PORT:3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
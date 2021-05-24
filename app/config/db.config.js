
module.exports = {
  // HOST: "xxxxxxxx",
  //  USER: "user",
  //  PASSWORD: "pass",
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "icansave",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const express = require('express');
const sseExpress = require('sse-express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const {children} = require('./clients');
const { QueryTypes } = require('sequelize');
const dbconfig =require('./config/db');
var corsOptions = {
  origin: ('Access-Control-Allow-Origin', '*')
};
app.use(cors(corsOptions));
const mysql =require('mysql')
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const db = require("./models/index");


initialize()
async function initialize() {
    const { HOST, PORT, USER, PASSWORD, DB } = dbconfig;
    const connection = await mysql.createConnection({ host: HOST, port: PORT, user: USER, password: PASSWORD });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB}\`;`);
    await  db.sequelize.sync();
}

require('./routes/UserRoutes')(app)
require('./routes/AuthRoutes')(app)
require('./routes/TransactionRoutes')(app)
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

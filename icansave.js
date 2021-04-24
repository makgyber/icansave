const express = require('express');
const sseExpress = require('sse-express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

const dbconfig =require('./config/db');
var corsOptions = {
  origin: ('Access-Control-Allow-Origin', '*')
};
app.use(cors(corsOptions));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const db = require("./models/index");
app.get('/', (req, res)=>{
res.status(200).send('<center><h1>Welcome Jose (:<h1></center>')
})
db.sequelize.sync();
require('./routes/UserRoutes')(app)
require('./routes/AuthRoutes')(app)
require('./routes/TransactionRoutes')(app)
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

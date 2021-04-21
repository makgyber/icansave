const express = require('express');
const sseExpress = require('sse-express');
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const {children} = require('./clients');
var corsOptions = {
  origin: ('Access-Control-Allow-Origin', '*')
};
app.use(cors(corsOptions));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const db = require("./models/index");

db.sequelize.sync();


app.get("/", (req, res) => {
  res.json({ message: "Welcome to iCanSave application." });
});

require('./routes/UserRoutes')(app)
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
// import packages
const https = require('https');
const fs = require('fs');

// serve the API with signed certificate on 443 (SSL/HTTPS) port

const app = express();

const httpsServer = https.createServer({
  // key: fs.readFileSync('/etc/letsencrypt/live/my_api_url/privkey.pem'),
  // cert: fs.readFileSync('/etc/letsencrypt/live/my_api_url/fullchain.pem'),
}, app);



var corsOptions = {
  //origin: "http://192.168.42.129:19000"
  origin: ["http://localhost","http://localhost:3010", "http://localhost:5000", "https://naangirisa.com"]
//origin: "http://localhost:3000";
};

//app.use(cors(corsOptions));
app.use(cors());
// parse requests of content-type - application/json
//app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use('/uploads',express.static('uploads'));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(bodyParser.raw());
// database
const db = require("./app/models/index");
const MaritalStatus = db.maritalstatus;
const Role = db.role;
const Gender = db.gender;
const Titles =db.titles;
const Country =db.country;
const Permission =db.permission;
db.sequelize.sync().then(()=>{
  //dumpPermissions();
  //dumpCountry();
  //dumpTitles();
  //dumpMaritalSatus();
  // initial();
   //dumpGenders();
  // console.log('Data dumped');
});

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/', (req, res) =>{
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


// simple route
app.get('/app', (req, res)=>{
  res.status(200).send('<center><h1>Welcome (:<h1></center>')
  })

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/admin.routes')(app);
require('./app/routes/FileUploadRoutes')(app);

require('./app/routes/UserRoutes')(app)
require('./app/routes/AuthRoutes')(app)
require('./app/routes/TransactionRoutes')(app)
// set port, listen for requests
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// httpsServer.listen(443, () => {
//   console.log('HTTPS Server running on port 443');
// });

function dumpPermissions(){
  const data =["view_only", "view_edit", "view_edit_delete"];
  for(let i=0; i<data.length; i++){
    Permission.create({
      permission: data[i],
      createdby: 1,
      updatedby: 1
    }).then(suc=>{
      console.log("Permissions Created successfully");
    }).catch(error=>{
      console.log(error);
    })
  }
}

function dumpCountry() {
  const data =[
    {name: "Uganda", code: "UG"},
    {name: "Tanzania, United Republic of", code: "TZ"},
    {name: "Kenya", code: "KE"}, 
    {name: "Ethiopia", code: "ET"}, 
    {name: "RWANDA", code: "RW"}, 
    {name: "Burundi", code: "BI"}, 
    {name: "Congo, The Democratic Republic of the", code: "CD"},  
    {name: "Sudan", code: "SD"}, 
];
  for(let i=0; i<data.length; i++){
    Country.create({
      name: data[i].name,
      code: data[i].code,
    }).then(suc=>{
      console.log("Countries Created successfully");
    }).catch(error=>{
      console.log(error);
    })
  }
}

function dumpTitles() {
  const data = ["Mr", "Mrs", "Ms", "Dr", "Prof", "Rev", "Bp", "Can"];
  for(let i=0; i<data.length; i++){
    Titles.create({
      title: data[i]
    }).then(suc=>{
      console.log("Titles Created successfully");
    }).catch(error=>{
      console.log(error);
    })
  }
}
function dumpGenders() {
  const data = ["Male", "Female"];
  for(let i=0; i<data.length; i++){
    Gender.create({
      gender: data[i]
    }).then(suc=>{
      console.log("Genders Created successfully");
    }).catch(error=>{
      console.log(error);
    })
  }
}
function dumpMaritalSatus() {
  const data = ["Single", "Married", "Divorced"];
  for(let i=0; i<data.length; i++){
    MaritalStatus.create({
      status: data[i]
    }).then(suc=>{
      console.log("MArital status Created successfully");
    }).catch(error=>{
      console.log(error);
    })
  }
}
function initial() {
  const data = ["user", "admin", "chairperson"];
  for(let i=0; i<data.length; i++){
    Role.create({
      name: data[i]
    }).then(suc=>{
      console.log("Roles Created successfully");
    }).catch(error=>{
      console.log(error);
    })
  }
}

// function getWeeksStartAndEndInMonth(month, year, start) {
//   let weeks = [],
//       firstDate = new Date(year, month, 1),
//       lastDate = new Date(year, month + 1, 0),
//       numDays = lastDate.getDate();

//   //let start = 1;
//   let end = 7 - firstDate.getDay();
//   if (start === 'monday') {
//       if (firstDate.getDay() === 0) {
//           end = 1;
//       } else {
//           end = 7 - firstDate.getDay() + 1;
//       }
//   }
//   while (start <= numDays) {
//       weeks.push({start: start, end: end});
//       start = end + 1;
//       end = end + 7;
//       end = start === 1 && end === 8 ? 1 : end;
//       if (end > numDays) {
//           end = numDays;
//       }
//   }
//   console.log(weeks)
//   return weeks;
// }
// const date=new Date();
// getWeeksStartAndEndInMonth(date.getMonth(),date.getFullYear(), 'monday')
// function getNumberOfWeek() {
//     const today = new Date();
//     const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
//     const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
//     return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
// }


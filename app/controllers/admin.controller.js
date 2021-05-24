const db = require("../models/index");
const { isNullOrEmpty, getStatusValue, getAccStatusValue, getBioStatusValue, getModuleName, wordCapitalisation, getProcessName, getSubModuleName, getPermissionName, capitaliseForUndescore } = require("../CustomFunctions/CustomFunctions");
const { ModuleEnums, SubModuleEnums, ProcessEnums, PermissionEnums } = require("../Enums/AllModules");
const sendSms = require("../sms/Twilio");
//const { is } = require("sequelize/types/lib/operators");
const LoanCategories =db.loancategories;
const Loan =db.loan;
const LoanApplications=db.loanapplications;
const User =db.user;
const Bio =db.bioinfo;
const Account = db.account;
const Savings = db.savings;
const Permissions =db.permission;
const Position =db.position;
const Module =db.module;
const SubModule = db.submodule;
const Process =db.processes;
const Role=db.role;
const Op = db.Sequelize.Op;


exports.createPosition = (req, res) => {
    const payload = req.body;
    if (isNullOrEmpty(payload.position)) {
        return res.status(500).send({ message: "Provide Position name" })
    }
    Position.create({
        positionname: payload.position,
        createdby: payload.userid,
        updatedby: payload.userid
    }).then(() => {
        return res.status(200).send({ message: "Position Created Successfully" })
    }).catch(error => {
        return res.status(500).send({ message: error.message })
    });
}
exports.createModule=(req, res)=>{
    const payload = req.body;
    if (isNullOrEmpty(payload.module)) {
        return res.status(500).send({ message: "Provide module name"})
    }
    Module.create({
        modulename: payload.module,
        createdby: payload.userid,
        updatedby: payload.userid
    }).then(() => {
        return res.status(200).send({ message: "Module Created Successfully" })
    }).catch(error => {
        return res.status(500).send({ message: error.message })
    });
}

exports.createSubModule=(req, res)=>{
    const payload = req.body;
    if (isNullOrEmpty(payload.submodule)) {
        return res.status(500).send({ message: "Provide Submodule name"})
    }
    SubModule.create({
        submodulename: payload.submodule,
        createdby: payload.userid,
        updatedby: payload.userid
    }).then(() => {
        return res.status(200).send({ message: "Submodule Created Successfully" })
    }).catch(error => {
        return res.status(500).send({ message: error.message })
    });
}
exports.createProcess=(req, res)=>{
    const payload = req.body;
    if (isNullOrEmpty(payload.process)) {
        return res.status(500).send({ message: "Provide process name"})
    }
    Process.create({
        process:payload.process,
        createdby:payload.userid,
        updatedby: payload.userid
    }).then(()=>{
        return res.status(200).send({ message: "Process Created Successfully" }) 
    }).catch(error => {
        return res.status(500).send({ message: error.message })
    })
}
exports.getPermissionsByPosition=(req, res)=>{
    const posId= req.body.positionId;
if(isNullOrEmpty(posId)){
    return res.status(500).send({ message: "Select Position" })
}
const permdetails = [];
Position.findAll({where:{id:posId }, include: [Permissions]})
.then(permissions => {
for (let i = 0; i < permissions.length; i++) {
if (permissions[i].permissions.length > 0) {
for (let b = 0; b < permissions[i].permissions.length; b++) {
// permdetails.push({
// id: permissions[i].permissions[b].id,//permissionId
// positionId: permissions[i].id,
// position: wordCapitalisation(permissions[i].positionname),
// process: getProcessName(permissions[i].permissions[b].process),
// module: getModuleName(permissions[i].permissions[b].module),
// submodule: getSubModuleName(permissions[i].permissions[b].submodule),
// permission: getPermissionName(permissions[i].permissions[b].permission)
// })
permdetails.push(permissions[i].permissions[b].id)
}}
}
return res.status(200).send({ permissions: permdetails  /* Permit: permissions*/ })
}).catch(error => {
return res.status(500).send({ message: error.message })
});
}
exports.getPositionPermisions = (req, res) => {
const permdetails = [];
Position.findAll({ include: [Permissions] })
.then(permissions => {
for (let i = 0; i < permissions.length; i++) {
if (permissions[i].permissions.length > 0) {
for (let b = 0; b < permissions[i].permissions.length; b++) {
permdetails.push({
positionId: permissions[i].id,
permissionId: permissions[i].permissions[b].id,
position: wordCapitalisation(permissions[i].positionname),
process: getProcessName(permissions[i].permissions[b].process),
module: getModuleName(permissions[i].permissions[b].module),
submodule: getSubModuleName(permissions[i].permissions[b].submodule),
permission: getPermissionName(permissions[i].permissions[b].permission)
})
}}
}
return res.status(200).send({ permissions: permdetails  /* Permit: permissions*/ })
}).catch(error => {
return res.status(500).send({ message: error.message })
});
}
exports.savePositionPermissions=(req, res)=>{
const posperm= req.body;
if(isNullOrEmpty(posperm.positionId)){
return res.status(500).send({ message: "No Position provided" })   
}
Position.findOne({
    where: {id: posperm.positionId}
}).then(position=>{
    Permissions.findAll({
        where: {id: posperm.permissions}
    }).then(permissions=>{
        position.setPermissions(permissions)
        .then(()=>{
            res.status(200).send({ message: "Permissions Saved Successfully" });
        })
    })
}).catch(err => {
    res.status(500).send({ message: err.message });
  });
}
exports.deletePositionPermission =(req, res)=>{
    const bodyData = req.body;
if(isNullOrEmpty(bodyData.permissionId || bodyData.positionId)){
    return res.status(500).send({ message: "An error was encountered" })      
}
Position.findOne({
    where: {id: bodyData.positionId}
}).then(position=>{
    Permissions.findOne({
        where: {id: bodyData.permissionId}
    }).then(perms=>{
        position.removePermissions(perms)
        .then(()=>{
            return res.status(200).send({ message: "Permissions Removed Successfully" });
        })
    })
}).catch(err => {
    return res.status(500).send({ message: err.message });
  });
}
exports.getModulePermissions=(req, res)=>{
const permdetails = [];
Module.findAll({ include: [Permissions] })
.then(modulePermissions => {

for(let i=0; i<modulePermissions.length; i++){
if(modulePermissions[i].permissions.length > 0){
for (let b = 0; b < modulePermissions[i].permissions.length; b++) {
permdetails.push({
    id: modulePermissions[i].permissions[b].module_permissions.permission_id,//permissionId
    moduleId: modulePermissions[i].id,
    process: getProcessName(modulePermissions[i].permissions[b].process),
    module: getModuleName(modulePermissions[i].permissions[b].module),
    submodule: getSubModuleName(modulePermissions[i].permissions[b].submodule),
    permission: getPermissionName(modulePermissions[i].permissions[b].permission)
}) 
}
}
}
return res.status(200).send( permdetails )
}).catch(error => {
return res.status(500).send({ message: error.message })
});
}

exports.getPositions=(req, res)=>{
Position.findAll()
.then(positions=>{
return res.status(200).send( positions )
}).catch(error => {
return res.status(500).send({ message: error.message })
});
}
exports.getModules=(req, res)=>{
    const data=[];
    const values =Object.keys(ModuleEnums);
    for(let i=0; i<values.length; i++){
        data.push({
            id: i,
            module: capitaliseForUndescore(values[i]) 
            })
}
res.status(200).send({ modules: data })
}

exports.createModule=(req, res)=>{
    const bodyData = req.body;
    if(isNullOrEmpty(bodyData.module)|| isNullOrEmpty(bodyData.userId)){
        return res.status(500).send({message: "Provide all details"})
    }
    for(let i=0; i<bodyData.module.length; i++){
        Module.create({
            modulename: bodyData.module[i],
            createdby: bodyData.userId,
            updatedby:bodyData.userId 
        }).then(()=>{
            res.status(200).send({message: "Captured successfully"}) 
        }).catch(error=>{
            res.status(200).send({message: error.message})  
        })
    }
}
exports.getSubModules=(req, res)=>{
    const data=[];
    const values =Object.keys(SubModuleEnums);
    for(let i=0; i<values.length; i++){
        data.push({
            id: i,
            submodule: capitaliseForUndescore(values[i])
            })
}
res.status(200).send({ submodules: data })
}
exports.getProcesses=(req, res)=>{
    const data=[];
    const values =Object.keys(ProcessEnums);
    for(let i=0; i<values.length; i++){
        data.push({
            id: i,
            process: capitaliseForUndescore(values[i])
            })
}
res.status(200).send({ processes: data })
}
exports.getPermissions=(req, res)=>{
    const data=[];
    const values =Object.keys(PermissionEnums);
    for(let i=0; i<values.length; i++){
        data.push({
            id: i,
            permission: capitaliseForUndescore(values[i])
            })
}
res.status(200).send({ permissions: data })
}

exports.createPermission=(req, res)=>{
    const bodyData = req.body;
    const permissions = req.body.permissions;
    if(isNullOrEmpty(bodyData.module)|| isNullOrEmpty(bodyData.submodule)){
        return res.status(500).send({message: "Provide all details"})
    }
    for(let i=0; i<permissions.length; i++){
        Permissions.create({
            module: bodyData.module,
            submodule: bodyData.submodule,
            process: bodyData.process,
            permission:permissions[i],
            createdby: bodyData.userId,
            updatedby: bodyData.userId
        }).then(perms=>{
            Module.findOne({
                where: {modulename: bodyData.module}
            }).then(modulenow=>{
                perms.setModules(modulenow)
                .then(()=>{
                   // return res.status(200).send({message: mods})
                    return res.status(200).send({message: "Permission Set Saved Succesfully"})
                }).catch(error=>{
                    return res.status(500).send({message: error.message})
                })
            })           
           // return res.status(200).send({message: "Permission Set Saved Succesfully"})
        })
    } 
}

exports.testFetch=(req, res)=>{
    const dd =req.body.id, nn=[];
        User.findAll({ where: {id: dd},
        include: [Role]
        })
        .then(user=>{
           for(let i=0; i<user.length; i++){
            nn.push({
                // userid: user[i].id, 
                // fullname: user[i].fullname, 
                // role: user[i].roles[0].name.toUpperCase(),
                // roleid: user[i].roles[0].user_roles.roleId
               modules: getModuleName(1)
            })
           }
           res.status(200).send({
            users: nn,
            //users: user
          });
        })
}

exports.getUserPositions=(req, res)=>{
    const positions=[];
    User.findAll({include: [Position]})
    .then(userpositions=>{
        for(let i=0; i<userpositions.length; i++){
            if(userpositions[i].positions.length>0){
            positions.push({
                userid: userpositions[i].id,
                fullname: userpositions[i].fullname,
                username: userpositions[i].username,
                telephone: userpositions[i].telephone,
                positionId: userpositions[i].positions[0].id,
                positionname: wordCapitalisation(userpositions[i].positions[0].positionname)
            })
        }
    }
        return res.status(200).send(positions)
    }).catch(error=>{
        return res.status(500).send({message: error.message})
    })
}
exports.saveUserPosition=(req, res)=>{
    const bodyData = req.body;
    if(isNullOrEmpty(bodyData.userId) ||isNullOrEmpty(bodyData.positionId)  ||bodyData.userId==undefined|| bodyData.positionId==undefined){
        return res.status(500).send({message: "Select all details"});
    }
    User.findOne({
        where: {id: bodyData.userId}
    }).then(user=>{
        user.setPositions(bodyData.positionId)
        .then(()=>{
            return res.status(200).send({message: "Position Saved Successfully"})
        }).catch(()=>{
            return res.status(500).send({message: "Ann error Occured"}) 
        })
    }).catch(()=>{
        return res.status(500).send({message: "Ann error Occured"}) 
    })
}
exports.removeUserPosition=(req, res)=>{
    const bodyData = req.body;
    if(isNullOrEmpty(bodyData.userId) ||isNullOrEmpty(bodyData.positionId)  ||bodyData.userId==undefined|| bodyData.positionId==undefined){
        return res.status(500).send({message: "An error occured"});
    }
    User.findOne({
        where: {id: bodyData.userId}
    }).then(user=>{
        user.removePositions(bodyData.positionId)
        .then(()=>{
            return res.status(200).send({message: "Position withdrawn Successfully"})
        }).catch(()=>{
            return res.status(500).send({message: "Ann error Occured"}) 
        })
    }).catch(()=>{
        return res.status(500).send({message: "Ann error Occured"}) 
    })
}
exports.getAllSavings=(req, res)=>{
    Savings.findAll({
      order: [
        ['dateofsaving', 'DESC']
      ]
    })
    .then(savings=>{
      if(!savings){
        return res.status(404).send({message: "Savings Not found." });
      }
      var allsavings = [];
      let sum =0;
      for(let i =0; i< savings.length; i++){
        sum+=savings[i].amount;
        allsavings.push({
          savingid: savings[i].id,
          userid: savings[i].userid, 
          amount: savings[i].amount, 
          dateofsave: savings[i].dateofsaving,
          accountname:savings[i].accountname,
          modeofpayment:savings[i].modeofpayment,
          reffnumber:savings[i].reffnumber,
          
        });
        
      }
      sum= sum;
      res.status(200).send({
        allsavings: allsavings,
        totalsavings: sum
      });
    })
    .catch(err =>{
      res.status(500).send({message: err.message});
    });
  }

  let clients = [];
  let facts = [];
  exports.eventsHandler=(request, response, next)=> {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
  
    const data = `data: ${JSON.stringify(facts)}\n\n`;
  
    response.write(data);
  
    const clientId = Date.now();
  
    const newClient = {
      id: clientId,
      response
    };
  
    clients.push(newClient);
  
    request.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
    });
  }
  

  function sendEventsToAll(newFact) {
  clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
}


exports.getAllUsersFordash=(req, res)=>{
    const allUsers = [];
    User.findAll({where: {usertype:1}
    },{ order: [
        ['createdAt', 'DESC'], ['status', 'DESC']
    ]
}).then(users=>{
    for(let i=0; i<users.length; i++){
        allUsers.push({
            id: users[i].id,
            fullname: users[i].fullname,
            username: users[i].username,
            email: users[i].email,
            telephone: users[i].mobilenumber,
            //status:  getAccStatusValue(users[i].status),
            status:  users[i].status,
            datecreated: users[i].createdAt,
            civilstatus: users[i].civilstatus
        })
    }
    res.status(200).send(allUsers)
}).catch(error=>{
    res.status(500).send({message: error.message}) 
})
}



exports.addFacts=(request, respsonse, next)=>{
    addFact()
    async function addFact() {
        const newFact = request.body;
        facts.push(newFact);
        respsonse.json(newFact)
        return sendEventsToAll(newFact);
      }

     
};
  

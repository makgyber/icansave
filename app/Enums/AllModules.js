const db = require("../models");

const Module = db.module;
const ModuleEnums ={
    MANAGEMENT: 0,
    ACCOUNTS: 1,
    CREDIT: 2,
    DATA: 3,
    TESTS: 4,
};
const SubModuleEnums ={
    USER_MANAGEMENT:0,
    STATEMENTS:1,
    LOANS:2,
    DATA_ENTRY: 3,
    DEV_TESTS: 4
};
const ProcessEnums ={
    REGISTER_USER: 0,
    VIEW_SAVINGS: 1,
    LOAN_APPLICATION: 2,
    CAPTURE_SAVINGS: 3,
    PDF_TESTS: 4,
    ASSIGN_SYSTEM_PERMISSIONS: 5
};

const PermissionEnums={
    READ_ONLY: 0,
    READ_AND_WRIGHT: 1,
    FULL_RIGHTS: 2,
    APPROVE: 3
};
function getNumber() {
    const data = [];
    const values = Object.keys(ModuleEnums);
    for (let i = 0; i < values.length; i++) {
        data.push(i)
    }
    Module.findAll({
        where: { modulename: data }
    }).then(mods => {
        if (data.length > mods.length) {
            const dd=(data.splice(mods.length))
            console.log(dd)
            for(let b=0; b<dd.length; b++){
                Module.create({
                    modulename:dd[b] ,
                    createdby: process.env.SUPER_USER,
                    updatedby: process.env.SUPER_USER
                }).then(()=>{
                    console.log("New Module capture Succesfully")
                }).catch(error => {
                    console.log(error.message)
                })
            } 
        } else {
            if ((data.length == mods.length)) {
                //console.log(mods)
            }
        }
    }).catch(error => {
        console.log(error.message)
    })
}
getNumber();
module.exports={
    ModuleEnums,
    SubModuleEnums,
    ProcessEnums,
    PermissionEnums   
}
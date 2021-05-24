const { PermissionEnums, ModuleEnums, ProcessEnums, SubModuleEnums } = require("../Enums/AllModules");

exports.isNullOrEmpty=(str)=>{
    //alert(str)
    if(str!==undefined){
     return !str.toString()||!str.toString().trim();}
  }

  exports.getStatusValue=(data)=>{
    const  status =["initiated", "submited","pending", "granted"];
      for(let i =0; i<status.length; i++){
        return status[data].toUpperCase();
      }
  }

  exports.getAccStatusValue=(data)=>{
    const  status =["inactive", "active","suspended"];
      for(let i =0; i<status.length; i++){
        return status[data].toUpperCase();
      }
  }
  exports.getBioStatusValue=(data)=>{
    const  status =["no", "yes"];
      for(let i =0; i<status.length; i++){
        return status[data].toUpperCase();
      }
  }


  //get names of items while stripping the underscores
  exports.getModuleName = (datas)=>{
    const modules = ModuleEnums; 
    const values =Object.keys(modules).find(k=>modules[k]===datas).toLowerCase().split('_'); //.join(" ");
    for(let i =0; i<values.length; i++){
      values[i]=values[i][0].toUpperCase() + values[i].slice(1);
    }
    return values.join(" ");
  }
  exports.getSubModuleName = (datas)=>{
    const modules = SubModuleEnums;
    const values =Object.keys(modules).find(k=>modules[k]===datas).toLowerCase().split('_'); //.join(" ");
    for(let i =0; i<values.length; i++){
      values[i]=values[i][0].toUpperCase() + values[i].slice(1);
    }
    return values.join(" ");
  }
  exports.getProcessName = (datas)=>{
    const modules = ProcessEnums; 
    const values =Object.keys(modules).find(k=>modules[k]===datas).toLowerCase().split('_'); //.join(" ");
    for(let i =0; i<values.length; i++){
      values[i]=values[i][0].toUpperCase() + values[i].slice(1);
    }
    return values.join(" ");
  }
  exports.getPermissionName = (datas)=>{
    const modules = PermissionEnums; 
    const values =Object.keys(modules).find(k=>modules[k]===datas).toLowerCase().split('_'); //.join(" ");
    for(let i =0; i<values.length; i++){
      values[i]=values[i][0].toUpperCase() + values[i].slice(1);
    }
    return values.join(" ");
  }
  exports.wordCapitalisation=(data)=>{
    const values =data.toLowerCase().split(' ');
    for(let i =0; i<values.length; i++){
      values[i]=values[i][0].toUpperCase() + values[i].slice(1);
      //value[i]=value[i].charAt(0).toUpperCase()+ value[i].slice(1);
    }
    return values.join(" ");
  }
  exports.capitaliseForUndescore=(data)=>{
    const values =data.toLowerCase().split('_');
    for(let i =0; i<values.length; i++){
      values[i]=values[i][0].toUpperCase() + values[i].slice(1);
      //value[i]=value[i].charAt(0).toUpperCase()+ value[i].slice(1);
    }
    return values.join(" ");
  }
  exports.capitaliseAndUnderscore=(data)=>{
    const values =data.toLowerCase().split(' ');
    for(let i =0; i<values.length; i++){
      values[i]=values[i].toUpperCase();
    }
    return values.join('_');
  }

  exports.getWeekOfMonth=(date) =>{
    let adjustedDate = date.getDate()+ date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    //console.log(`This is week  ${parseInt(prefixes[0 | adjustedDate / 7])+1}  of ${date.getMonth()}`)
    return (parseInt(prefixes[0 | adjustedDate / 7])+1);
  }
  
  

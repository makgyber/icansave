
exports.isNullOrEmpty=(str)=>{
    //alert(str)
    if(str!==undefined){
     return !str.toString()||!str.toString().trim();}
  }


exports.isNotNullOrEmpty=(string)=>{
  if(string ==undefined || string ==null || string =="null" || string ==""){
    return false;
  }else{
    return true;
  }
}
exports.randomString = (length = 8) => {
  // Declare all characters
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let str = '';
  for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};




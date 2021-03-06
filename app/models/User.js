module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
      username: {type: Sequelize.STRING},
      fullname: {type: Sequelize.STRING},
      email: {type: Sequelize.STRING },
      mobilenumber: {type: Sequelize.STRING},
      idtype: {type: Sequelize.STRING},
      idnumber: {type: Sequelize.STRING},
      password: {type: Sequelize.STRING },
      address: {type: Sequelize.STRING},
      province: {type: Sequelize.STRING},
      city: {type: Sequelize.STRING},
      barangay: {type: Sequelize.STRING},
      zipcode: {type: Sequelize.STRING},
      civilstatus: {type: Sequelize.STRING},
      occupation: {type: Sequelize.STRING},
      companyname: {type: Sequelize.STRING},
      companyaddress: {type: Sequelize.STRING},
      companycontact: {type: Sequelize.STRING},
      facebookprofile:  {type: Sequelize.STRING},
      savingobjective: {type: Sequelize.STRING},
      targetsaving: {type: Sequelize.STRING},
      savingperiod: {type: Sequelize.STRING},
      depositplan: {type: Sequelize.STRING},
      periodicsavingamount: {type: Sequelize.STRING},
      status:{type: Sequelize.STRING, defaultValue: 'Active'},
      usertype: {type: Sequelize.INTEGER, defaultValue: 1}
  },
  
  {
    freezeTableName: true
  }
  );

  return User;
};

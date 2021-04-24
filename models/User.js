module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true},
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
    });
    return User;
  };
  
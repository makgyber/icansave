module.exports=(sequelize, Sequelize)=>{
    const Account = sequelize.define("saving_accounts",{
        id: {type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true},
        userid: {type: Sequelize.INTEGER, allowNull: false},
        accountname: {type: Sequelize.STRING, allowNull: false},
        accountnumber: {type: Sequelize.BIGINT(11), allowNull: false, unique: true},
        status: {type: Sequelize.INTEGER, defaultValue: 0},
        createdBy: {type: Sequelize.BIGINT(11), allowNull: false}
    })
    return Account;
}
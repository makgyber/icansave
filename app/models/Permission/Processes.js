const { sequelize } = require("..");

module.exports=(sequelize, Sequelize)=>{
    const Processes =sequelize.define("processes",{
        id:{type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true},
        process:{type: Sequelize.STRING, allowNull: false, unique: true},
        createdby:{type: Sequelize.BIGINT(11), allowNull: false},
        updatedby: {type: Sequelize.BIGINT(11), allowNull: false}
    }
    ,{
        freezeTableName: true
    })
    return Processes;
}
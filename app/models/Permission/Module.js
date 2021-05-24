module.exports=(sequelize, Sequelize)=>{
    const Module =sequelize.define("module",{
        id:{type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true},
        modulename:{type: Sequelize.INTEGER, allowNull: false, unique: true},
        createdby:{type: Sequelize.BIGINT(11), allowNull: false},
        updatedby: {type: Sequelize.BIGINT(11), allowNull: false}
    },{
        freezeTableName: true
    }
    )
    return Module;
}
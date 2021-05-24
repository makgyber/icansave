 module.exports=(sequelize, Sequelize)=>{
    const Permissions = sequelize.define("permissions",{
        id:{type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true},
        module: {type: Sequelize.BIGINT, allowNull: false},
        submodule: {type: Sequelize.BIGINT, allowNull: false},
        process: {type: Sequelize.BIGINT, allowNull: false},
        permission:{type: Sequelize.BIGINT, allowNull: false},
        createdby:{type: Sequelize.BIGINT(11), allowNull: false},
        updatedby: {type: Sequelize.BIGINT(11), allowNull: false}
    }
    ,{
        freezeTableName: true
    })
    return Permissions;
}
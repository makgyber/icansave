module.exports=(sequelize,Sequelize)=>{
    const Position = sequelize.define("position", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        positionname:{type: Sequelize.STRING, allowNull: false, unique: true},
        createdby:{type: Sequelize.BIGINT(11), allowNull: false},
        updatedby: {type: Sequelize.BIGINT(11), allowNull: false}
    }
    ,{
        freezeTableName: true
    }
    )
    return Position;
}
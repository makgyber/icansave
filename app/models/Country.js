module.exports =(sequelize, Sequelize)=>{
    const Country =sequelize.define("country",{
        id:{ type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, allowNull: false },
        code: { type: Sequelize.STRING, allowNull: false},
    },
    {
        freezeTableName: true
    }
    )
    return Country;
}
module.exports= (sequelize, Sequelize)=>{
    const Titles =sequelize.define("titles", {
        id:{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        title: {type: Sequelize.STRING, unique: true, allowNull: false}
    }, {
        freezeTableName: true
    })
    return Titles;
}
module.exports=(sequelize, Sequelize)=>{
    const BioData =sequelize.define("bio_information",{
        id: {type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true},
        userid: {type: Sequelize.INTEGER , allowNull: false},
        usedtitle: {type: Sequelize.INTEGER, allowNull: false},
        surname: {type: Sequelize.STRING, allowNull: false},
        givenname: {type: Sequelize.STRING, allowNull: false},
        othername: {type: Sequelize.STRING},
        sex: {type: Sequelize.INTEGER, allowNull: false},
        marital_status: {type: Sequelize.INTEGER, allowNull: false},
        dateofbirth: {type: Sequelize.DATE, allowNull: false},
        nationality: {type: Sequelize.BIGINT(11), allowNull: false},
        nin: {type: Sequelize.STRING, allowNull: false}, 
        createdby: { type: Sequelize.BIGINT(11), allowNull: false },
        updatedby: { type: Sequelize.BIGINT(11), allowNull: false }
    },{
        freezeTableName: true
    })
    return BioData;
}
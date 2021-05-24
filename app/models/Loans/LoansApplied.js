module.exports = (sequelize, Sequelize)=>{
    const LoanApplications =sequelize.define("loan_applications", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        userid: {type: Sequelize.INTEGER, allowNull: false},
        loanid: {type:  Sequelize.BIGINT(11), allowNull: false},
        daterequired: {type: Sequelize.DATE, allowNull: false},
        createdby: { type: Sequelize.BIGINT(11), allowNull: false },
        updatedby: { type: Sequelize.BIGINT(11), allowNull: false },
        status: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0}
    })
    return LoanApplications;
}
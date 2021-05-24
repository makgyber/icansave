module.exports = (sequelize, Sequelize) => {
    const Loan = sequelize.define("loans", {
        id: { type: Sequelize.BIGINT(11), primaryKey: true, autoIncrement: true },
        categoryid: { type: Sequelize.INTEGER, allowNull: false },
        amount:{type: Sequelize.TEXT, allowNull: false },
        maxpaymentperiod: {type: Sequelize.INTEGER, allowNull: false },
        rate: {type: Sequelize.STRING, allowNull: false },
        createdby: { type: Sequelize.BIGINT(11), allowNull: false },
        updatedby: { type: Sequelize.BIGINT(11), allowNull: false }
    },{
        freezeTableName: true
    })
    return Loan;
}
module.exports = (sequelize, Sequelize) => {
    const LoanCategories = sequelize.define("loan_categories", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, unique: true, allowNull: false },
        description:{type: Sequelize.TEXT, allowNull: false },
        createdby: { type: Sequelize.BIGINT(11), allowNull: false },
        updatedby: { type: Sequelize.BIGINT(11), allowNull: false }
    })
    return LoanCategories;
}
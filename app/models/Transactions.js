module.exports = (sequelize, Sequelize) => {
    const Transactions = sequelize.define("transactions", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        amount: { type: Sequelize.STRING, allowNull: false },
        currency: { type: Sequelize.STRING, allowNull: false },
        type: { type: Sequelize.STRING, allowNull: false },
        slip: { type: Sequelize.STRING},
        status: { type: Sequelize.STRING, allowNull: false },
    });
    return Transactions;
}

module.exports = (sequelize, Sequelize) => {
    const Transactions = sequelize.define("transactions", {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false},
        phonenumber:{ type: Sequelize.STRING, allowNull: false},
        transactionid:{ type: Sequelize.STRING, allowNull: false, unique: true },
        transaction_ref:{ type: Sequelize.STRING, allowNull: false, unique: true },
        amount: { type: Sequelize.STRING, allowNull: false },
        currency: { type: Sequelize.STRING, allowNull: false },
        payment_type: { type: Sequelize.STRING, allowNull: false },
        currency: { type: Sequelize.STRING, allowNull: false },
        status: { type: Sequelize.STRING, allowNull: false },
        transactiondate: { type: Sequelize.DATE, allowNull: false },
    });
    return Transactions;
}

'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define(
    'transactions',
    {
      code: DataTypes.STRING,
      transactionDate: DataTypes.DATE,
      status: DataTypes.STRING,
      note: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      adminId: DataTypes.INTEGER,
    },
    {}
  );
  transactions.associate = function(models) {
    // associations can be defined here
    transactions.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'users',
    });

    transactions.belongsTo(models.admins, {
      foreignKey: 'adminId',
      as: 'admins',
    });
  };
  return transactions;
};

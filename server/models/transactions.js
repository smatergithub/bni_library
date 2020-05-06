'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define(
    'transactions',
    {
      code: DataTypes.STRING,
      transactionDate: DataTypes.DATE,
      status: DataTypes.STRING,
      note: DataTypes.STRING,
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adminId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  transactions.associate = function(models) {
    // associations can be defined here
    transactions.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    transactions.belongsTo(models.admins, {
      foreignKey: 'adminId',
      onDelete: 'CASCADE',
    });

    transactions.hasOne(models.transactionDetails, {
      foreignKey: 'transactionId',
    });
  };
  return transactions;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define(
    'transactions',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      code: DataTypes.STRING,
      transactionDate: DataTypes.DATE,
      status: DataTypes.STRING,
      note: DataTypes.STRING,
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  transactions.associate = function (models) {
    // associations can be defined here
    transactions.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'users',
    });

    transactions.hasOne(models.transactiondetails, {
      foreignKey: 'transactionId',
      as: 'transactiondetails',
      onDelete: 'CASCADE',
    });
  };
  return transactions;
};

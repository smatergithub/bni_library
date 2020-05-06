'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactionDetails = sequelize.define(
    'transactionDetails',
    {
      transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookId: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {}
  );
  transactionDetails.associate = function(models) {
    // associations can be defined here

    transactionDetails.belongsTo(models.transactions, {
      foreignKey: 'transactionId',
      onDelete: 'CASCADE',
    });
  };
  return transactionDetails;
};

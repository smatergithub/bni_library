'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactionDetails = sequelize.define(
    'transactionDetails',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
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

'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactiondetails = sequelize.define(
    'transactiondetails',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      transactionId: DataTypes.STRING,
      bookId: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {}
  );
  transactiondetails.associate = function(models) {
    // associations can be defined here
    transactiondetails.belongsTo(models.transactions, {
      foreignKey: 'transactionId',
      onDelete: 'CASCADE',
    });

    transactiondetails.belongsTo(models.books, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
    });
  };
  return transactiondetails;
};

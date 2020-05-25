'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactionBook = sequelize.define('transactionBook', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    code: DataTypes.STRING,
    transDate: DataTypes.DATE,
    status: DataTypes.STRING,
    note: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    userId: DataTypes.STRING,
    bookId: DataTypes.STRING
  }, {});
  transactionBook.associate = function (models) {
    // associations can be defined here
  };
  return transactionBook;
};

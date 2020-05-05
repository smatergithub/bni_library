'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactionDetails = sequelize.define('transactionDetails', {
    transactionId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  transactionDetails.associate = function(models) {
    // associations can be defined here
  };
  return transactionDetails;
};
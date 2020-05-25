'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactionEbook = sequelize.define('transactionEbook', {
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
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    userId: DataTypes.STRING,
    ebookId: DataTypes.STRING
  }, {});
  transactionEbook.associate = function (models) {
    // associations can be defined here
  };
  return transactionEbook;
};

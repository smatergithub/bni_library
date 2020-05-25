'use strict';
module.exports = (sequelize, DataTypes) => {
  const ratingEbook = sequelize.define('ratingEbook', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    transactionEbookId: DataTypes.STRING,
    ebookId: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  ratingEbook.associate = function (models) {
    // associations can be defined here
  };
  return ratingEbook;
};

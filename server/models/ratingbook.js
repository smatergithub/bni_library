'use strict';
module.exports = (sequelize, DataTypes) => {
  const ratingBook = sequelize.define('ratingBook', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    transactionBookId: DataTypes.STRING,
    BookId: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  ratingBook.associate = function (models) {
    // associations can be defined here
  };
  return ratingBook;
};

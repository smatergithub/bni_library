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
    bookId: DataTypes.STRING,
    userId: DataTypes.STRING,
    note: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  ratingBook.associate = function (models) {
    // associations can be defined here
    ratingBook.belongsTo(models.books, {
      foreignKey: 'bookId',
      as: 'book'
    })

    ratingBook.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user'
    })
    ratingBook.belongsTo(models.transactionBook, {
      foreignKey: 'transactionBookId',
      as: 'transactionBook'
    })

  };
  return ratingBook;
};

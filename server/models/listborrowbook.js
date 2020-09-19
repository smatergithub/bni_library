'use strict';
module.exports = (sequelize, DataTypes) => {
  const listBorrowBook = sequelize.define('listBorrowBook', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    bookId: DataTypes.STRING,
    transactionBookId: DataTypes.STRING
  }, {});
  listBorrowBook.associate = function (models) {
    // associations can be defined here
    listBorrowBook.belongsTo(models.books, {
      foreignKey: 'bookId',
      as: 'book'
    })

    // associations can be defined here
    listBorrowBook.belongsTo(models.transactionBook, {
      foreignKey: 'transactionBookId',
      as: 'transactionBook'
    })
  };
  return listBorrowBook;
};

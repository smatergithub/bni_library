'use strict';
module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define(
    'books',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      code: DataTypes.STRING,
      title: DataTypes.STRING,
      statementResponsibility: DataTypes.STRING,
      description: DataTypes.STRING,
      dateBook: DataTypes.DATE,
      stockBook: DataTypes.INTEGER,
      category: DataTypes.STRING,
      image: DataTypes.STRING,
      author: DataTypes.STRING,
      isPromotion: DataTypes.BOOLEAN,
    },
    {}
  );
  books.associate = function (models) {
    books.hasMany(models.transactionBook, {
      foreignKey: 'bookId',
      as: 'transactionBook'
    })
  };
  return books;
};

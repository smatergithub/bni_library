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
      edition: DataTypes.STRING,
      image: DataTypes.STRING,
      author: DataTypes.STRING,
      transDate: DataTypes.DATE,
      isPromotion: DataTypes.BOOLEAN,
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  books.associate = function (models) {
    // associations can be defined here

    books.belongsTo(models.categories, {
      foreignKey: 'categoryId',
      as: 'categories',
    });

    books.hasOne(models.transactiondetails, {
      foreignKey: 'bookId',
      as: 'transactiondetails',
      onDelete: 'CASCADE',
    });
  };
  return books;
};

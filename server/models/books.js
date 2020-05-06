'use strict';
module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define(
    'books',
    {
      code: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      author: DataTypes.STRING,
      transDate: DataTypes.DATE,
      unitTypeId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  books.associate = function(models) {
    // associations can be defined here
    books.belongsTo(models.unitTypes, {
      foreignKey: 'unitTypeId',
      onDelete: 'CASCADE',
    });

    books.belongsTo(models.categories, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });

    books.hasMany(models.transactionDetails, {
      foreignKey: 'bookId',
    });
  };
  return books;
};

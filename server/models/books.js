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
      unitTypeId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {}
  );
  books.associate = function(models) {
    // associations can be defined here
    books.belongsTo(models.unitType, {
      foreignKey: 'unitTypeId',
      as: 'unitType',
    });

    books.belongsTo(models.categories, {
      foreignKey: 'categoryId',
      as: 'categories',
    });
  };
  return books;
};

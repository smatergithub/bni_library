'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    'categories',
    {
      code: DataTypes.STRING,
      displayName: DataTypes.STRING,
    },
    {}
  );
  categories.associate = function(models) {
    // associations can be defined here
    categories.hasOne(models.books, {
      foreignKey: 'categoryId',
      as: 'categories',
    });
  };
  return categories;
};

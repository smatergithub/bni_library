'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    'categories',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      code: DataTypes.STRING,
      displayName: DataTypes.STRING,
    },
    {}
  );
  categories.associate = function(models) {
    // associations can be defined here
    categories.hasOne(models.books, {
      foreignKey: 'categoryId',
    });
  };
  return categories;
};

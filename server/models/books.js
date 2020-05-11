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
    books.belongsTo(models.unittypes, {
      foreignKey: 'unitTypeId',
      as: 'unittypes',
    });

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

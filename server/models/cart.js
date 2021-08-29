'use strict';
module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define(
    'cart',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: DataTypes.STRING,
      bookId: DataTypes.STRING,
      ebookId: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  cart.associate = function (models) {
    // associations can be defined here
    // associations can be defined here
    cart.belongsTo(models.books, {
      foreignKey: 'bookId',
      as: 'book',
    });

    cart.belongsTo(models.ebooks, {
      foreignKey: 'ebookId',
      as: 'ebook',
    });

    cart.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return cart;
};

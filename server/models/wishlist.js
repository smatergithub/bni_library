'use strict';
module.exports = (sequelize, DataTypes) => {
  const wishlist = sequelize.define(
    'wishlist',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      bookId: DataTypes.STRING,
      userId: DataTypes.STRING,
      ebookId: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  wishlist.associate = function (models) {
    // associations can be defined here
    wishlist.belongsTo(models.books, {
      foreignKey: 'bookId',
      as: 'book',
    });

    wishlist.belongsTo(models.ebooks, {
      foreignKey: 'ebookId',
      as: 'ebook',
    });

    wishlist.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return wishlist;
};

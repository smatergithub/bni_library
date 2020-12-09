'use strict';
module.exports = (sequelize, DataTypes) => {
  const ratingEbook = sequelize.define(
    'ratingEbook',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      transactionEbookId: DataTypes.STRING,
      ebookId: DataTypes.STRING,
      userId: DataTypes.STRING,
      note: DataTypes.STRING,
      rating: DataTypes.INTEGER,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  ratingEbook.associate = function(models) {
    // associations can be defined here
    ratingEbook.belongsTo(models.ebooks, {
      foreignKey: 'ebookId',
      as: 'ebook',
    });

    ratingEbook.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
    });
    ratingEbook.belongsTo(models.transactionBook, {
      foreignKey: 'transactionEbookId',
      as: 'transactionEbook',
    });
  };
  return ratingEbook;
};

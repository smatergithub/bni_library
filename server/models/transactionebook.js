'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactionEbook = sequelize.define(
    'transactionEbook',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      code: DataTypes.STRING,
      transDate: DataTypes.DATE,
      status: DataTypes.STRING,
      isGiveRating: DataTypes.BOOLEAN,
      isBorrowed: DataTypes.BOOLEAN,
      note: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      userId: DataTypes.STRING,
      ebookId: DataTypes.STRING,
    },
    {}
  );
  transactionEbook.associate = function (models) {
    // associations can be defined here

    transactionEbook.belongsTo(models.ebooks, {
      foreignKey: 'ebookId',
      as: 'ebook',
    });

    transactionEbook.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return transactionEbook;
};

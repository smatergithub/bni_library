'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactionBook = sequelize.define(
    'transactionBook',
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
      note: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      userId: DataTypes.STRING,
      bookId: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  transactionBook.associate = function(models) {
    // associations can be defined here
    transactionBook.belongsTo(models.books, {
      foreignKey: 'bookId',
      as: 'book',
    });

    transactionBook.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return transactionBook;
};

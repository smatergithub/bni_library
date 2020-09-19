'use strict';
module.exports = (sequelize, DataTypes) => {
  const listBorrowEbook = sequelize.define('listBorrowEbook', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    EbookId: DataTypes.STRING,
    transactionEbookId: DataTypes.STRING
  }, {});
  listBorrowEbook.associate = function (models) {
    // associations can be defined here
    listBorrowEbook.belongsTo(models.ebooks, {
      foreignKey: 'ebookId',
      as: 'ebook'
    })

    // associations can be defined here
    listBorrowEbook.belongsTo(models.transactionEbook, {
      foreignKey: 'transactionEbookId',
      as: 'transactionEbook'
    })
  };
  return listBorrowEbook;
};

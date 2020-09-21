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
      kategori: DataTypes.STRING,
      judul: DataTypes.STRING,
      pengarang: DataTypes.STRING,
      tahunTerbit: DataTypes.STRING,
      description: DataTypes.TEXT,
      stockBuku: DataTypes.INTEGER,
      tanggalTerbit: DataTypes.STRING,
      isbn: DataTypes.STRING,
      bahasa: DataTypes.STRING,
      penerbit: DataTypes.STRING,
      lokasiPerpustakaan: DataTypes.STRING,
      status: DataTypes.STRING,
      image: DataTypes.STRING,
      countRating: DataTypes.INTEGER,
      condition: DataTypes.STRING,
      isPromotion: DataTypes.BOOLEAN,
    },
    {

    }
  );
  books.associate = function (models) {
    books.hasMany(models.transactionBook, {
      foreignKey: 'bookId',
      as: 'transactionBook'
    })
  };
  return books;
};

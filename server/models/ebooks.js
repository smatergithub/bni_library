'use strict';
module.exports = (sequelize, DataTypes) => {
  const ebooks = sequelize.define('ebooks', {
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
    jumlahPeminjam : DataTypes.INTEGER,
    description: DataTypes.TEXT,
    tanggalTerbit: DataTypes.STRING,
    isbn: DataTypes.STRING,
    bahasa: DataTypes.STRING,
    penerbit: DataTypes.STRING,
    lokasiPerpustakaan: DataTypes.STRING,
    status: DataTypes.STRING,
    nomorLemari :  DataTypes.STRING,
    rakLemari :  DataTypes.STRING,
    keterangan :  DataTypes.TEXT,
    sourceLink :  DataTypes.STRING,
    image: DataTypes.STRING,
    countRating: DataTypes.INTEGER,
    totalRead: DataTypes.INTEGER,
  });
  ebooks.associate = function(models) {
    // associations can be defined here
  };
  return ebooks;
};

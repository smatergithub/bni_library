'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ebooks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      kategori: {
        type: Sequelize.STRING,
      },
      judul: {
        type: Sequelize.STRING,
      },
      pengarang: {
        type: Sequelize.STRING,
      },
      tahunTerbit: {
        type: Sequelize.STRING,
      },
      jumlahPeminjam: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      tanggalTerbit: {
        type: Sequelize.STRING,
      },
      isbn: {
        type: Sequelize.STRING,
      },
      bahasa: {
        type: Sequelize.STRING,
      },
      penerbit: {
        type: Sequelize.STRING,
      },
      lokasiPerpustakaan: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      nomorLemari: {
        type: Sequelize.STRING,
      },
      rakLemari: {
        type: Sequelize.STRING,
      },
      keterangan: {
        type: Sequelize.TEXT,
      },
      urlFile: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      countRating: {
        type: Sequelize.INTEGER,
      },
      totalRead: {
        type: Sequelize.INTEGER,
      },
      sourceLink: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ebooks');
  },
};

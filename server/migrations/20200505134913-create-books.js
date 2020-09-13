'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('books', {
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
      description: {
        type: Sequelize.TEXT,
      },
      stockBuku: {
        type: Sequelize.INTEGER,
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
      image: {
        type: Sequelize.STRING,
      },
      condition: {
        type: Sequelize.STRING,
      },
      countRating: {
        type: Sequelize.INTEGER,
      },
      isPromotion: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('books');
  },
};

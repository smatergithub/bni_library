'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      npp: {
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      tanggalLahir: {
        type: Sequelize.DATE,
      },
      wilayah: {
        type: Sequelize.STRING,
      },
      singkatan: {
        type: Sequelize.STRING,
      },
      kdunit: {
        type: Sequelize.STRING,
      },
      unitBesaran: {
        type: Sequelize.STRING,
      },
      unit: {
        type: Sequelize.STRING,
      },
      jenjang: {
        type: Sequelize.STRING,
      },
      jabatan: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },

      password: {
        type: Sequelize.STRING,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
      },
      superAdmin: {
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
    return queryInterface.dropTable('users');
  },
};

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
      tgl_lahir: {
        type: Sequelize.STRING,
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
      unit_besaran: {
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
      url_img: {
        type: Sequelize.STRING,
      },
      mapUrl: {
        type: Sequelize.TEXT,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
      },
      superAdmin: {
        type: Sequelize.BOOLEAN,
      },
      password: {
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
    return queryInterface.dropTable('users');
  },
};

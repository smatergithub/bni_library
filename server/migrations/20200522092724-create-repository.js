'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('repositories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      methodology: {
        type: Sequelize.STRING,
      },
      university: {
        type: Sequelize.STRING,
      },
      faculty: {
        type: Sequelize.STRING,
      },
      strata: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      releaseYear: {
        type: Sequelize.STRING,
      },
      document: {
        type: Sequelize.STRING,
      },
      abstrack: {
        type: Sequelize.STRING,
      },
      isApproved: {
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
    return queryInterface.dropTable('repositories');
  },
};

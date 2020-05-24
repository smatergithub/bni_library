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
      university: {
        type: Sequelize.STRING
      },
      titleRepository: {
        type: Sequelize.STRING
      },
      bab1: {
        type: Sequelize.STRING
      },
      bab2: {
        type: Sequelize.STRING
      },
      bab3: {
        type: Sequelize.STRING
      },
      bab4: {
        type: Sequelize.STRING
      },
      bab5: {
        type: Sequelize.STRING
      },
      abstrack: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('repositories');
  }
};

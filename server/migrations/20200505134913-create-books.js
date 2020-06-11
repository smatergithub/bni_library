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
      code: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      statementResponsibility: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      dateBook: {
        type: Sequelize.DATE,
      },
      stockBook: {
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
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

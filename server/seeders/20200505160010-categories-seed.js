('use strict');
const { v4: uuidv4 } = require('uuid');
var faker = require('faker');
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert(
      'categories',
      [
        {
          id: uuidv4(),
          code: Math.floor(1000 + Math.random() * 9000),
          displayName: faker.name.jobTitle(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          code: Math.floor(1000 + Math.random() * 9000),
          displayName: faker.name.jobTitle(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          code: Math.floor(1000 + Math.random() * 9000),
          displayName: faker.name.jobTitle(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          code: Math.floor(1000 + Math.random() * 9000),
          displayName: faker.name.jobTitle(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          code: Math.floor(1000 + Math.random() * 9000),
          displayName: faker.name.jobTitle(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          code: Math.floor(1000 + Math.random() * 9000),
          displayName: faker.name.jobTitle(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          code: Math.floor(1000 + Math.random() * 9000),
          displayName: faker.name.jobTitle(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          code: Math.floor(1000 + Math.random() * 9000),
          displayName: faker.name.jobTitle(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          code: Math.floor(1000 + Math.random() * 9000),
          displayName: faker.name.jobTitle(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          code: Math.floor(1000 + Math.random() * 9000),
          displayName: faker.name.jobTitle(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          code: Math.floor(1000 + Math.random() * 9000),
          displayName: faker.name.jobTitle(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};

'use strict';
var bcrypt = require('bcryptjs');

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
    const salt = bcrypt.genSalt(8);
    const hashedPassword = bcrypt.hash(123123, salt);
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'hendra',
        lastName: 'gunawan',
        username: 'admin',
        address: 'bengkong',
        email: 'gunawan140@gmail.com',
        phoneNumber: 123132123,
        password: hashedPassword,
        isAdmin: 1,
        superAdmin: 1,
      },
    ]);
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

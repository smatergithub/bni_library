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
    return queryInterface.bulkInsert('users', [
      {
        name: 'hendra',
        email: 'gunawan140@gmail.com',
        password: bcrypt.hash(123123),
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

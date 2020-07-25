'use strict';
const { v4: uuidv4 } = require('uuid');
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

    return queryInterface.bulkInsert('books', [
      {
        id: uuidv4(),
        kategori: "sains",
        judul: `juragan ${uuidv4()}`,
        pengarang: `juragan ${uuidv4()}`,
        tahunTerbit: "2019-01-01",
        description: `lorem ipsum lorem ipsum lorem ipsum ${uuidv4()}`,
        stockBuku: 10,
        tanggalTerbit: "2020",
        isbn: "23023023-23-23-23-23-",
        bahasa: "indonesia",
        penerbit: "hendra",
        lokasiPerpustakaan: "batam",
        status: "ada",
        image: "test",
        isPromotion: DataTypes.BOOLEAN,
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
  }
};

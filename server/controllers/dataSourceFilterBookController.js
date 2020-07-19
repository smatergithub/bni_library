const Books = require('../models').books;
const Sequelize = require('sequelize');

module.exports = {
  getCategory: async (req, res) => {
    return await Books.findAll()
      .then(book => {
        let categoryDisplay = []
        book.forEach(item => {
          const category = {
            value: item.id,
            label: item.kategori
          }
          categoryDisplay.push(category)
        })
        res.status(200).send(categoryDisplay);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getTahunTerbit: async (req, res) => {
    return await Books.findAll().then(book => {
      let tahunTerbitDisplay = []
      book.forEach(item => {
        const tahunTerbit = {
          value: item.id,
          label: item.tahunTerbit
        }
        tahunTerbitDisplay.push(tahunTerbit)
      })
      res.status(200).send(tahunTerbitDisplay);
    })
      .catch(err => {
        res.status(500).send(err);
      })
  }


};

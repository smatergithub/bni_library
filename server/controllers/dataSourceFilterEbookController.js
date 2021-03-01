const Ebooks = require('../models/').ebooks;
const Sequelize = require('sequelize');

module.exports = {
  getCategory: async (req, res) => {
    return await Ebooks.findAll()
      .then(ebook => {
        let categoryDisplay = []
        ebook.forEach(item => {
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
    return await Ebooks.findAll().then(ebook => {
      let tahunTerbitDisplay = []
      ebook.forEach(item => {
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

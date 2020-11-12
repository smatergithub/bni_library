const Ebooks = require('../models/').ebooks;
const Books = require('../models').books;
const RatingBook = require('../models').ratingBook;
const Users = require('../models').users;
const sequelize = require('sequelize');

module.exports = {
  dashboardSummary: async (req, res) => {
    const EbookList = await Ebooks.findAndCountAll().then(response => {
      return {
        count: response.count,
        data: response.rows,
      };
    });

    const BookList = await Books.findAndCountAll({
      offset: 1,
      limit: 5,
    }).then(response => {
      return {
        count: response.count,
        data: response.rows,
      };
    });

    const UserList = await Users.findAndCountAll().then(response => {
      return {
        count: response.count,
        data: response.rows,
      };
    });

    let paramQuerySQL = {
      include: ['book'],
      limit: 5,
      order: [['rating', 'DESC']],
      attributes: ['rating', [sequelize.fn('sum', sequelize.col('rating')), 'totalRating']],
    };

    const RatingList = await RatingBook.findAndCountAll(paramQuerySQL).then(response => {
      return {
        count: response.count,
        data: response.rows,
      };
    });

    try {
      res.status(200).json({
        ebookCount: EbookList.count,
        bookCount: BookList.count,
        userCount: UserList.count,
        ebook: EbookList.data,
        ratingBook: RatingList.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

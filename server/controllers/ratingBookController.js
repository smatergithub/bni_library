const TransactionBook = require("../models").transactionBook;
const RatingBook = require("../models").ratingBook;
const sequelize = require('sequelize')
const Books = require('../models').books;

module.exports = {
  inputRatingBook: async (req, res) => {
    var userId = req.userId;
    TransactionBook.findAll({
      where: {
        userId: userId
      }
    })
      .then(transaction => {
        let dataTransactionReturned = transaction.filter(x => x.status === "Dikembalikan");
        let dataTransactionRating = dataTransactionReturned.filter(x => x.isGiveRating === false);
        if (!dataTransactionRating) {
          res.status(500).json({ message: "transaction book not found" })
        }
        const createRating = RatingBook.create({
          transactionBookId: dataTransactionRating[0].id,
          bookId: dataTransactionRating[0].bookId,
          userId: req.userId,
          rating: req.body.rating,
          note: req.body.note
        })

        if (!createRating) {
          return res.status(404).send("Failed rating");
        }

        if (createRating) {
          TransactionBook.findByPk(dataTransactionRating[0].id).then(transaksi => {
            transaksi.update({
              isGiveRating: true
            }).then(response => {
              return res.status(201).json({
                message: "Process Succesfully input rating",
              });
            })
          })
        }
        else {
          return res.status(200).json({
            message: "no rating input ",
          });
        }
      })
      .catch(err => {
        res.status(200).send(err);
      })
  },
  listBookbyRating: async (req, res) => {
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
      }
    })

    try {
      res.status(200).json({
        ratingBook: RatingList.data
      });
    }
    catch (err) {
      console.log(err)
    }
  }
}

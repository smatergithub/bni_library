const TransactionBook = require('../models').transactionBook;
const RatingBook = require('../models').ratingBook;
const sequelize = require('sequelize');
const Books = require('../models').books;

//status
//dipinjam
//dikembalikan

module.exports = {
  listRating: (req, res) => {
    return RatingBook.findAll({ include: ['book', 'user'] })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  inputRatingBook: async (req, res) => {
    var userId = req.userId;
    TransactionBook.findAll({
      where: {
        userId: userId,
      },
    })
      .then(async (transaction) => {
        let dataTransactionReturned = transaction.filter((x) => x.status === 'Dikembalikan');
        let dataTransactionRating = dataTransactionReturned.filter((x) => x.isGiveRating === false);
        if (!dataTransactionRating) {
          res.status(500).json({ message: 'transaction book not found' });
        }
        const createRating = RatingBook.create({
          transactionBookId: dataTransactionRating[0].id,
          bookId: dataTransactionRating[0].bookId,
          userId: req.userId,
          rating: req.body.rating,
          note: req.body.note,
        });

        if (!createRating) {
          return res.status(404).send('Failed rating');
        }

        await TransactionBook.findByPk(dataTransactionRating[0].id)
          .then((transaksi) => {
            transaksi
              .update({
                isGiveRating: true,
              })
              .then((response) => {
                return res.status(201).json({
                  message: 'Process Succesfully input rating',
                });
              })
              .catch((err) => {});
          })
          .catch((err) => {});

        await Books.findByPk(dataTransactionRating[0].bookId)
          .then((book) => {
            book
              .update({
                countRating: book.countRating + req.body.rating,
                totalRead: book.totalRead + 1,
              })
              .then((response) => {
                return res.status(201).json({
                  message: 'Process Succesfully input rating',
                });
              })
              .catch((err) => {});
          })
          .catch((err) => {});
      })
      .catch((err) => {
        return res.status(200).json({
          message: 'no rating input ',
        });
      });
  },

  listBookbyRating: async (req, res) => {
    let paramQuerySQL = {
      limit: 5,
      order: [['countRating', 'DESC']],
    };
    const RatingList = await Books.findAndCountAll(paramQuerySQL).then((response) => {
      let list = response.rows.filter((x) => x.countRating !== null);
      return {
        count: response.count,
        data: list,
      };
    });

    try {
      res.status(200).json({
        ratingBook: RatingList.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

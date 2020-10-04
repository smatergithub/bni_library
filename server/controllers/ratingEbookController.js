const TransactionEbook = require('../models').transactionEbook;
const RatingEbook = require('../models').ratingEbook;
const sequelize = require('sequelize');
const Ebooks = require('../models/').ebooks;
const ListBorrowEbook = require('../models').listBorrowEbook;

//status
//dipinjam
//dikembalikan

module.exports = {
  inputRatingEbook: async (req, res) => {
    var userId = req.userId;
    TransactionEbook.findAll({
      where: {
        userId: userId,
      },
    })
      .then(async transaction => {
        let dataTransactionReturned = transaction.filter(x => x.status === 'Dikembalikan');
        let dataTransactionRating = dataTransactionReturned.filter(x => x.isGiveRating === false);
        if (!dataTransactionRating) {
          res.status(500).json({ message: 'transaction ebook not found' });
        }
        const createRating = RatingEbook.create({
          transactionEbookId: dataTransactionRating[0].id,
          ebookId: dataTransactionRating[0].ebookId,
          userId: req.userId,
          rating: req.body.rating,
          note: req.body.note,
        });

        if (!createRating) {
          return res.status(404).send('Failed rating');
        }

        await TransactionEbook.findByPk(dataTransactionRating[0].id)
          .then(transaksi => {
            transaksi
              .update({
                isGiveRating: true,
              })
              .then(response => {
                return res.status(201).json({
                  message: 'Process Succesfully input rating',
                });
              })
              .catch(err => {});
          })
          .catch(err => {});
        await Ebooks.findByPk(dataTransactionRating[0].ebookId)
          .then(ebook => {
            ebook
              .update({
                countRating: ebook.countRating + req.body.rating,
                totalRead: ebook.totalRead + 1,
              })
              .then(response => {
                return res.status(201).json({
                  message: 'Process Succesfully input rating',
                });
              })
              .catch(err => {});
          })
          .catch(err => {});

        await ListBorrowEbook.findAll({
          where: { transactionEbookId: dataTransactionRating[0].id },
        })
          .then(listBorrow => {
            listBorrow[0]
              .update({
                transactionEbookId: null,
              })
              .then(response => {
                return res.status(201).json({
                  message: 'Process Succesfully input rating',
                });
              })
              .catch(err => {});
          })
          .catch(err => {});
      })
      .catch(err => {
        return res.status(200).json({
          message: 'no rating input ',
        });
      });
  },
  listEbookbyRating: async (req, res) => {
    let paramQuerySQL = {
      include: ['book'],
      limit: 5,
      order: [['rating', 'DESC']],
      attributes: ['rating', [sequelize.fn('sum', sequelize.col('rating')), 'totalRating']],
    };

    const RatingList = await RatingEbook.findAndCountAll(paramQuerySQL).then(response => {
      return {
        count: response.count,
        data: response.rows,
      };
    });

    try {
      res.status(200).json({
        RatingEbook: RatingList.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

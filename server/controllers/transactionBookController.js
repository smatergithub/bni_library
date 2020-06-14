const Sequelize = require('sequelize');
const Books = require('../models/').books;
const TransactionBook = require('../models').transactionBook;

module.exports = {
  list: async (req, res) => {
    TransactionBook.findAll({ include: ['book', 'user'] })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.json(err);
      });
  },
  // pinjam buku
  borrowBook: async (req, res) => {
    const { bookId, quantity, startDate, endDate, note } = req.body;

    const book = await Books.findByPk(bookId);

    // validate if quantity grather than book stock
    if (quantity > book.stockBook) {
      return res.json({
        message: 'exceeded the stock limit',
      });
    }

    Books.findByPk(bookId)
      .then(book => {
        book
          .update({
            stockBook: book.stockBook - quantity,
          })
          .catch(err => {
            return res.status(400).send(err);
          });
      })
      .catch(err => {
        return res.status(400).send(err);
      });

    TransactionBook.create({
      code: `INV-${Math.round(Math.random() * 1000000)}`,
      transDate: Date(),
      status: 'Borrowed',
      userId: req.userId,
      note,
      quantity,
      startDate,
      endDate,
      bookId,
    })
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  returnABook: async (req, res) => {
    const { transactionId } = req.params;

    const transactionBook = await TransactionBook.findByPk(transactionId);

    if (!transactionBook) {
      return res.json({
        message: 'transaction not found',
      });
    }

    TransactionBook.findByPk(transactionId)
      .then(transaction => {
        transaction
          .update({
            status: 'Returned',
          })
          .catch(err => {
            res.status(400).send(err);
          });
      })
      .catch(err => {
        res.status(400).send(err);
      });

    Books.findByPk(transactionBook.bookId)
      .then(book => {
        book
          .update({
            stockBook: book.stockBook + transactionBook.quantity,
          })
          .catch(err => {
            res.status(400).send(err);
          });
      })
      .catch(err => {
        res.status(400).send(err);
      });

    return res.json({
      message: 'Succesfully Return',
    });
  },
};

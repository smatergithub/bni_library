const Sequelize = require('sequelize');
const Ebooks = require('../models/').ebooks;
const TransactionEbook = require('../models').transactionEbook;

module.exports = {
  list: async (req, res) => {
    TransactionEbook.findAll({ include: ['ebook', 'user'] })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.json(err);
      });
  },

  // pinjam ebook
  borrowEbook: async (req, res) => {
    const { ebookId, isBorrowed, startDate, endDate, note } = req.body;

    const ebook = await Ebooks.findByPk(ebookId);

    // validate if quantity grather than ebook stock
    if (ebook.isBorrowed) {
      return res.json({
        message: 'Ebook Already Borrowed',
      });
    }

    Ebooks.findByPk(ebookId)
      .then(ebook => {
        ebook
          .update({
            isBorrowed: true,
          })
          .catch(err => {
            return res.status(400).send(err);
          });
      })
      .catch(err => {
        return res.status(400).send(err);
      });

    transactionEbook
      .create({
        code: `INV-${Math.round(Math.random() * 1000000)}`,
        transDate: Date(),
        status: 'Borrowed',
        userId: req.userId,
        note,
        isBorrowed,
        startDate,
        endDate,
        ebookId,
      })
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  returnEbook: async (req, res) => {
    const { transactionId } = req.params;

    const transactionEbook = await TransactionEbook.findByPk(transactionId);

    if (!transactionBook) {
      return res.json({
        message: 'transaction not found',
      });
    }

    TransactionEbook.findByPk(transactionId)
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

    Ebooks.findByPk(transactionEbook.ebookId)
      .then(ebook => {
        ebook
          .update({
            isBorrowed: false,
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

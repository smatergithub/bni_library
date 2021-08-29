const Cart = require('../models/').cart;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const readXlsxFile = require('read-excel-file/node');

module.exports = {
  list: (req, res) => {
    return Cart.findAll({ include: ['book', 'ebook', 'user'] })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  add: async (req, res) => {
    return Cart.create({
      userId: req.body.userId,
      bookId: req.body.bookId,
      ebookId: req.body.ebookId,
    })
      .then((response) =>
        res.status(201).json({ message: 'successfully create Cart', data: response })
      )
      .catch((err) => res.status(500).send(err));
  },

  update: async (req, res) => {
    return Cart.findByPk(req.params.id)
      .then((find) => {
        if (!find) {
          return res.status(400).send({ message: 'Cart not found' });
        }
        return find
          .update({
            userId: req.body.userId,
            bookId: req.body.bookId,
            ebookId: req.body.ebookId,
          })
          .then((response) =>
            res.status(200).json({ message: 'successfully update Cart', data: response })
          )
          .catch((err) => res.status(404).send(err));
      })
      .catch((error) => res.status(500).send(error));
  },

  delete: async (req, res) => {
    return Cart.findByPk(req.params.id)
      .then((find) => {
        if (!find) {
          return res.status(404).send({ message: 'Cart not found' });
        }
        return find
          .destroy()
          .then(() => res.status(200).send({ message: 'succesfully delete' }))
          .catch((error) => res.status(404).send(error));
      })
      .catch((error) => res.status(500).send(error));
  },

  deleteByBookId: async (req, res) => {
    return Cart.destroy({
      where: {
        bookId: {
          [Op.like]: '%' + req.params.id + '%',
        },
      },
    })
      .then(() => res.status(200).send({ message: 'succesfully delete' }))
      .catch((error) => res.status(500).send(error));
  },
  deleteByEbookId: async (req, res) => {
    return Cart.destroy({
      where: {
        ebookId: {
          [Op.like]: '%' + req.params.id + '%',
        },
      },
    })
      .then(() => res.status(200).send({ message: 'succesfully delete' }))
      .catch((error) => res.status(500).send(error));
  },
};

const Books = require('../models').books;
const Categories = require('../models').categories;
const upload = require("../helpers/Upload.js");
const path = require('path');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  list(req, res) {

    // queryStrings
    let { q, order, sort, limit, offset } = req.query;

    let paramQuerySQL = {
      include: [
        { model: Categories, as: 'categories' },
      ],
    };


    //search (q) , need fix
    if (q != '' && typeof q !== 'undefined') {
      paramQuerySQL.where = {
        q: {
          [Op.like]: '%' + q + '%'
        }
      }

    }

    //limit
    if (limit != '' && typeof limit !== 'undefined' && limit > 0) {
      paramQuerySQL.limit = parseInt(limit);
    }

    // offset
    if (offset != '' && typeof offset !== 'undefined' && offset > 0) {
      paramQuerySQL.offset = parseInt(offset);
    }

    // sort par defaut si param vide ou inexistant
    if (typeof sort === 'undefined' || sort == '') {
      sort = 'ASC';
    }
    // order by
    if (
      order != '' &&
      typeof order !== 'undefined' &&
      ['name'].includes(order.toLowerCase())
    ) {
      paramQuerySQL.order = [[order, sort]];
    }

    return Books.findAndCountAll(paramQuerySQL).then(book => {
      res.status(200).send(book);
    })
      .catch(err => {
        res.status(500).send(err)
      })

  },

  getById(req, res) {
    return Books.findByPk(req.params.id, {
      include: [
        { model: Categories, as: 'categories' },
      ],
    })
      .then(book => {
        if (!book) {
          return res.status(404).send({
            message: 'book Not Found',
          });
        }
        return res.status(200).send(book);
      })
      .catch(error => res.status(400).send(error));
  },

  add(req, res) {
    upload(req, res, err => {
      if (err) throw err;
      return Books.create({
        code: req.body.code,
        title: req.body.title,
        statementResponsibility: req.body.statementResponsibility,
        description: req.body.description,
        edition: req.body.edition,
        image: req.file.path,
        author: req.body.author,
        transDate: req.body.transDate,
        isPromotion: req.body.isPromotion,
        categoryId: req.body.categoryId,
      })
        .then(response => res.status(200).send(response))
        .catch(err => res.status(400).send(err));
    });
  },

  update(req, res) {
    upload(req, res, err => {
      if (err) throw err;
      return Books.findByPk(req.params.id)
        .then(book => {
          if (!book) {
            return res.status(400).send({ message: 'Book not found' });
          }
          return book
            .update({
              code: req.body.code || book.code,
              title: req.body.title || book.title,
              statementResponsibility: req.body.statementResponsibility || book.statementResponsibility,
              description: req.body.description || book.description,
              edition: req.body.edition || book.edition,
              image: req.file.path || book.image,
              author: req.body.author || book.author,
              transDate: req.body.transDate || book.transDate,
              isPromotion: req.body.isPromotion || book.isPromotion,
              categoryId: req.body.categoryId || book.categoryId,
            })
            .then(response => res.status(200).send(response))
            .catch(err => res.status(400).send(err));
        })
        .catch(error => res.status(400).send(error));
    });
  },

  delete(req, res) {
    return Books.findByPk(req.params.id)
      .then(book => {
        if (!book) {
          return res.status(400).send({ message: 'Book not found' });
        }
        return book
          .destroy()
          .then(() => res.status(204).send({ message: 'succesfully delete' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};

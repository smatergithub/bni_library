const Ebooks = require('../models/').ebooks;
const Upload = require('../helpers/Upload.js');
const path = require('path');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  getEbookList(req, res) {
    // queryStrings
    let { q, order, sort, limit, offset } = req.query;

    let paramQuerySQL = {};

    //search (q) , need fix
    if (q != '' && typeof q !== 'undefined') {
      paramQuerySQL.where = {
        q: {
          [Op.like]: '%' + q + '%',
        },
      };
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
    if (order != '' && typeof order !== 'undefined' && ['name'].includes(order.toLowerCase())) {
      paramQuerySQL.order = [[order, sort]];
    }

    return Ebooks.findAndCountAll(paramQuerySQL)
      .then(book => {
        res.status(200).send(book);
      })
      .catch(err => {
        res.status(500).send({ err });
      });
  },
  getEbookById(req, res) {
    return Ebooks.findByPk(req.params.id)
      .then(ebook => {
        if (!ebook) {
          return res.status(404).send({
            message: 'Ebook Not Found',
          });
        }
        return res.status(200).send(book);
      })
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    // queryStrings
    let { q, order, sort, limit, offset } = req.query;

    let paramQuerySQL = {};

    //search (q) , need fix
    if (q != '' && typeof q !== 'undefined') {
      paramQuerySQL.where = {
        q: {
          [Op.like]: '%' + q + '%',
        },
      };
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
    if (order != '' && typeof order !== 'undefined' && ['name'].includes(order.toLowerCase())) {
      paramQuerySQL.order = [[order, sort]];
    }

    return Ebooks.findAndCountAll(paramQuerySQL)
      .then(book => {
        res.status(200).send(book);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getById(req, res) {
    return Ebooks.findByPk(req.params.id)
      .then(ebook => {
        if (!ebook) {
          return res.status(404).send({
            message: 'Ebook Not Found',
          });
        }
        return res.status(200).send(ebook);
      })
      .catch(error => res.status(400).send(error));
  },

  add(req, res) {
    Upload(req, res, err => {
      if (err) throw err;
      return Ebooks.create({
        code: req.body.code,
        title: req.body.title,
        statementResponsibility: req.body.statementResponsibility,
        description: req.body.description,
        image: req.file.path,
        author: req.body.author,
        dateEbook: req.body.dateBook,
        category: req.body.category,
        sourceEbook: req.body.sourceEbook,
        isBorrowed: false,
      })
        .then(response =>
          res.status(200).json({ message: 'successfully create ebook', data: response })
        )
        .catch(err => res.status(400).send(err));
    });
  },

  update(req, res) {
    Upload(req, res, err => {
      if (err) throw err;
      return Ebooks.findByPk(req.params.id)
        .then(ebook => {
          if (!ebook) {
            return res.status(400).send({ message: 'Ebook not found' });
          }
          return ebook
            .update({
              code: req.body.code,
              title: req.body.title,
              statementResponsibility: req.body.statementResponsibility,
              description: req.body.description,
              image: req.file.path,
              author: req.body.author,
              dateEbook: req.body.dateBook,
              category: req.body.category,
              sourceEbook: req.body.sourceEbook,
              isBorrowed: false,
            })
            .then(response =>
              res.status(200).json({ message: 'successfully update ebook', data: response })
            )
            .catch(err => res.status(400).send(err));
        })
        .catch(error => res.status(400).send(error));
    });
  },

  delete(req, res) {
    return Ebooks.findByPk(req.params.id)
      .then(ebook => {
        if (!ebook) {
          return res.status(400).send({ message: 'Ebook not found' });
        }
        return ebook
          .destroy()
          .then(() => res.status(200).send({ message: 'succesfully delete' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};

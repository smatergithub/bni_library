const Books = require('../models').books;
const Upload = require('../helpers/Upload.js');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  getBookList: async (req, res) => {
    // queryStrings
    let { q, order, sort, limit, offset, page } = req.query;

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
    // page
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.page = parseInt(page);
    }
    // offset
    if (offset != '' && typeof offset !== 'undefined' && offset > 0) {
      paramQuerySQL.offset = parseInt(offset - 1);
    }

    // sort par defaut si param vide ou inexistant
    if (typeof sort === 'undefined' || sort == '') {
      sort = 'ASC';
    }
    // order by
    if (order != '' && typeof order !== 'undefined' && ['name'].includes(order.toLowerCase())) {
      paramQuerySQL.order = [[order, sort]];
    }

    return await Books.findAndCountAll(paramQuerySQL)
      .then(book => {
        let activePage = Math.ceil(book.count / paramQuerySQL.limit);
        let page = paramQuerySQL.page;
        res.status(200).json({
          count: book.count,
          totalPage: activePage,
          activePage: page,
          data: book.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getBookById: async (req, res) => {
    return await Books.findByPk(req.params.id)
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

  list: async (req, res) => {
    // queryStrings
    let { q, order, sort, limit, offset, page } = req.query;
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

    // page
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.page = parseInt(page);
    }
    // offset
    if (offset != '' && typeof offset !== 'undefined' && offset > 0) {
      paramQuerySQL.offset = parseInt(offset - 1);
    }
    // sort par defaut si param vide ou inexistant
    if (typeof sort === 'undefined' || sort == '') {
      sort = 'ASC';
    }
    // order by
    if (order != '' && typeof order !== 'undefined' && ['name'].includes(order.toLowerCase())) {
      paramQuerySQL.order = [[order, sort]];
    }
    return await Books.findAndCountAll(paramQuerySQL)
      .then(book => {
        let activePage = Math.ceil(book.count / paramQuerySQL.limit);
        let page = paramQuerySQL.page;
        res.status(200).json({
          count: book.count,
          totalPage: activePage,
          activePage: page,
          data: book.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getById: async (req, res) => {
    return await Books.findByPk(req.params.id)
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

  add: async (req, res) => {
    Upload(req, res, err => {
      if (err) throw err;
      // console.log('req file', req.file);
      return Books.create({
        code: req.body.code,
        title: req.body.title,
        statementResponsibility: req.body.statementResponsibility,
        description: req.body.description,
        dateBook: req.body.dateBook,
        stockBook: req.body.stockBook,
        category: req.body.category,
        image: req.file.path,
        author: req.body.author,
        isPromotion: req.body.isPromotion ? req.body.isPromotion : false,
      })
        .then(response =>
          res.status(200).json({ message: 'successfully create book', data: response })
        )
        .catch(err => res.status(400).send(err));
    });
  },

  update: async (req, res) => {
    Upload(req, res, err => {
      if (err) throw err;
      return Books.findByPk(req.params.id)
        .then(book => {
          if (!book) {
            return res.status(400).send({ message: 'Book not found' });
          }
          return book
            .update({
              code: req.body.code,
              title: req.body.title,
              statementResponsibility: req.body.statementResponsibility,
              description: req.body.description,
              dateBook: req.body.dateBook,
              stockBook: req.body.stockBook,
              category: req.body.category,
              image: req.body.file.path,
              author: req.body.author,
              isPromotion: req.body.isPromotion ? req.body.isPromotion : false,
            })
            .then(response =>
              res.status(200).json({ message: 'successfully create book', data: response })
            )
            .catch(err => res.status(400).send(err));
        })
        .catch(error => res.status(400).send(error));
    });
  },

  delete: async (req, res) => {
    return Books.findByPk(req.params.id)
      .then(book => {
        if (!book) {
          return res.status(400).send({ message: 'Book not found' });
        }
        return book
          .destroy()
          .then(() => res.status(200).send({ message: 'succesfully delete' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};

const Ebooks = require('../models/').ebooks;
const Upload = require('../middelwares/uploadImage');
const path = require('path');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  getEbookList: async (req, res) => {
    // queryStrings
    let { q, order, sort, limit, page } = req.query;

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
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.query.limit);
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
      .then(ebook => {
        let activePage = Math.ceil(ebook.count / paramQuerySQL.limit);
        let page = paramQuerySQL.page;
        res.status(200).json({
          count: ebook.count,
          totalPage: activePage,
          activePage: page,
          data: ebook.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getEbookById: async (req, res) => {
    return Ebooks.findByPk(req.params.id)
      .then(ebook => {
        if (!ebook) {
          return res.status(404).send({
            message: 'Ebook Not Found',
          });
        }
        return res.status(200).send(book);
      })
      .catch(error => res.status(500).send(error));
  },

  list: async (req, res) => {
    // queryStrings
    let { q, order, sort, limit, page } = req.query;

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
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt((page - 1) * req.query.limit);
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
      .then(ebook => {
        let totalPage = Math.ceil(ebook.count / paramQuerySQL.limit);
        let page = paramQuerySQL.page;
        res.status(200).json({
          count: ebook.count,
          totalPage: totalPage,
          activePage: page,
          data: ebook.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getById: async (req, res) => {
    return Ebooks.findByPk(req.params.id)
      .then(ebook => {
        if (!ebook) {
          return res.status(404).send({
            message: 'Ebook Not Found',
          });
        }
        return res.status(200).send(ebook);
      })
      .catch(error => res.status(500).send(error));
  },

  add: async (req, res) => {
    return Ebooks.create({
      code: req.body.code,
      title: req.body.title,
      note: req.body.note,
      description: req.body.description,
      image: req.file.path,
      author: req.body.author,
      dateEbook: req.body.dateBook,
      category: req.body.category,
      sourceEbook: req.body.sourceEbook,
      isBorrowed: false,
    })
      .then(response =>
        res.status(203).json({ message: 'successfully create ebook', data: response })
      )
      .catch(err => res.status(500).send(err));
  },

  update: async (req, res) => {
    return Ebooks.findByPk(req.params.id)
      .then(ebook => {
        if (!ebook) {
          return res.status(404).send({ message: 'Ebook not found' });
        }
        return ebook
          .update({
            code: req.body.code,
            title: req.body.title,
            note: req.body.note,
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
          .catch(err => res.status(404).send(err));
      })
      .catch(error => res.status(500).send(error));
  },

  delete: async (req, res) => {
    return Ebooks.findByPk(req.params.id)
      .then(ebook => {
        if (!ebook) {
          return res.status(404).send({ message: 'Ebook not found' });
        }
        return ebook
          .destroy()
          .then(() => res.status(200).send({ message: 'succesfully delete' }))
          .catch(error => res.status(404).send(error));
      })
      .catch(error => res.status(500).send(error));
  },
};

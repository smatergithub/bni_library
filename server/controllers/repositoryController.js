const Repositorys = require('../models/').repository;
const UploadFileExcel = require('../helpers/UploadFileExcel');
const path = require('path');

module.exports = {
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

    // page
    if (page != '' && typeof page !== 'undefined' && page > 0) {
      paramQuerySQL.offset = parseInt(page);
    }

    // sort par defaut si param vide ou inexistant
    if (typeof sort === 'undefined' || sort == '') {
      sort = 'ASC';
    }
    // order by
    if (order != '' && typeof order !== 'undefined' && ['name'].includes(order.toLowerCase())) {
      paramQuerySQL.order = [[order, sort]];
    }

    return Repositorys.findAndCountAll(paramQuerySQL)
      .then(repository => {
        let activePage = Math.ceil(repository.count / paramQuerySQL.limit);
        let page = paramQuerySQL.offset;
        res.status(200).json({
          count: repository.count,
          totalPage: activePage,
          activePage: page,
          data: repository.rows,
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getById: async (req, res) => {
    return Repositorys.findByPk(req.params.id)
      .then(repository => {
        if (!repository) {
          return res.status(404).send({
            message: 'repository Not Found',
          });
        }
        return res.status(200).send(repository);
      })
      .catch(error => res.status(400).send(error));
  },

  add: async (req, res) => {
    UploadFileExcel(req, res, err => {
      if (err) throw err;
      return Repositorys.create({
        university: req.body.university,
        titleRepository: req.body.titleRepository,
        typeRepository: req.body.typeRepository,
        bab1: req.files['bab1'] !== undefined ? req.files['bab1'][0].path : null,
        bab2: req.files['bab2'] !== undefined ? req.files['bab2'][0].path : null,
        bab3: req.files['bab3'] !== undefined ? req.files['bab3'][0].path : null,
        bab4: req.files['bab4'] !== undefined ? req.files['bab4'][0].path : null,
        bab5: req.files['bab5'] !== undefined ? req.files['bab5'][0].path : null,
        abstrack: req.files['abstrack'] !== undefined ? req.files['abstrack'][0] : null,
      })
        .then(response => res.status(200).send(response))
        .catch(err => res.status(400).send(err));
    });
  },

  delete: async (req, res) => {
    return Repositorys.findByPk(req.params.id)
      .then(repository => {
        if (!repository) {
          return res.status(400).send({ message: 'repository not found' });
        }
        return repository
          .destroy()
          .then(() => res.status(204).send({ message: 'succesfully delete' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};

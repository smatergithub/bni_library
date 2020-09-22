const Repositorys = require('../models/').repository;
const UploadMultipleDocument = require('../middelwares/uploadMultipleDocument');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  list: async (req, res) => {
    // queryStrings
    let { q, order, category, sort, limit, page } = req.query;

    let paramQuerySQL = {};
    if (category != '' && typeof category !== 'undefined') {
      paramQuerySQL.where = {
        category: {
          [Op.like]: '%' + category + '%',
        },
      };
    }
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

    return Repositorys.findAndCountAll(paramQuerySQL)
      .then(repository => {
        let activePage = Math.ceil(repository.count / paramQuerySQL.limit);
        let page = paramQuerySQL.page;
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
      .catch(error => res.status(500).send(error));
  },

  add: async (req, res) => {
    // console.log('')
    UploadMultipleDocument(req, res, err => {
      if (err) throw err;
      return Repositorys.create({
        name: req.body.name,
        title: req.body.title,
        category: req.body.category,
        university: req.body.university,
        editor: req.body.editor,
        translateBy: req.body.translateBy,
        description: req.body.description,
        releaseYear: req.body.releaseYear,
        bab1: req.files['bab1'] !== undefined ? req.files['bab1'][0].path : null,
        bab2: req.files['bab2'] !== undefined ? req.files['bab2'][0].path : null,
        bab3: req.files['bab3'] !== undefined ? req.files['bab3'][0].path : null,
        bab4: req.files['bab4'] !== undefined ? req.files['bab4'][0].path : null,
        bab5: req.files['bab5'] !== undefined ? req.files['bab5'][0].path : null,
        abstrack: req.files['abstrack'] !== undefined ? req.files['abstrack'][0] : null,
      })
        .then(response =>
          res.status(201).json({ message: 'Succesfully Create Repository', data: response })
        )
        .catch(err => res.status(500).send(err));
    });
  },

  update: async (req, res) => {
    UploadMultipleDocument(req, res, err => {
      if (err) throw err;
      return Repositorys.findByPk(req.params.id)
        .then(repo => {
          if (!repo) {
            return res.status(400).send({ message: 'repo not found' });
          }

          return repo
            .update({
              name: req.body.name,
              title: req.body.title,
              category: req.body.category,
              university: req.body.university,
              editor: req.body.editor,
              translateBy: req.body.translateBy,
              description: req.body.description,
              releaseYear: req.body.releaseYear,
              bab1: req.files['bab1'] !== undefined ? req.files['bab1'][0].path : null,
              bab2: req.files['bab2'] !== undefined ? req.files['bab2'][0].path : null,
              bab3: req.files['bab3'] !== undefined ? req.files['bab3'][0].path : null,
              bab4: req.files['bab4'] !== undefined ? req.files['bab4'][0].path : null,
              bab5: req.files['bab5'] !== undefined ? req.files['bab5'][0].path : null,
              abstrack: req.files['abstrack'] !== undefined ? req.files['abstrack'][0] : null,
            })
            .then(response =>
              res.status(201).json({ message: 'Succesfully Create Repository', data: response })
            )
            .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
    });
  },

  delete: async (req, res) => {
    return Repositorys.findByPk(req.params.id)
      .then(repository => {
        if (!repository) {
          return res.status(404).send({ message: 'repository not found' });
        }
        return repository
          .destroy()
          .then(() => res.status(200).send({ message: 'succesfully delete' }))
          .catch(error => res.status(404).send(error));
      })
      .catch(error => res.status(500).send(error));
  },
};

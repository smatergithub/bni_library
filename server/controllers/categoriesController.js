const Categories = require('../models').categories;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  list(req, res) {
    // queryStrings
    let { q, order, sort, limit, offset } = req.query;
    let paramQuerySQL = {};


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

    return Categories.findAndCountAll(paramQuerySQL)
      .then(category => res.status(200).json({
        count: category.count,
        data: category.rows
      }))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Categories.findByPk(req.params.id)
      .then(category => {
        if (!category) {
          return res.status(404).send({
            message: 'category Not Found',
          });
        }
        return res.status(200).send(category);
      })
      .catch(error => res.status(400).send(error));
  },

  add(req, res) {
    return Categories.create({
      code: req.body.code,
      displayName: req.body.displayName,
    })
      .then(response => res.status(200).send(response))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Categories.findByPk(req.params.id)
      .then(category => {
        if (!category) {
          return res.status(404).send({
            message: 'Category Not Found',
          });
        }
        return category
          .update({
            code: req.body.code || category.code,
            displayName: req.body.displayName || category.displayName,
          })
          .then(() => res.status(200).send(category))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Categories.findByPk(req.params.id)
      .then(category => {
        if (!category) {
          return res.status(400).send({
            message: 'Category Not Found',
          });
        }
        return category
          .destroy()
          .then(() => res.status(200).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};

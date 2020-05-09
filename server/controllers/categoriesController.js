const Categories = require('../models').categories;

module.exports = {
  list(req, res) {
    return Categories.findAll({
      include: [],
      order: [['createdAt', 'DESC']],
    })
      .then(category => res.status(200).send(category))
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

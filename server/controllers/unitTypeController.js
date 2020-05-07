const UnitTypes = require('../models').unittypes;

module.exports = {
  list(req, res) {
    return UnitTypes.findAll({
      include: [],
      order: [['createdAt', 'DESC']],
    })
      .then(response => res.status(200).send(response))
      .catch(error => {
        res.status(400).send(error);
      });
  },
  getById(req, res) {
    return UnitTypes.findByPk(req.params.id, {
      include: [],
    })
      .then(unittype => {
        if (!unittype) {
          return res.status(404).send({
            message: 'Unit Types Not Found',
          });
        }
        return res.status(200).send(unittype);
      })
      .catch(error => res.status(400).send(error));
  },

  add(req, res) {
    return UnitTypes.create({
      code: req.body.code,
      displayName: req.body.displayName,
    })
      .then(response => res.status(200).send(response))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return UnitTypes.findByPk(req.params.id)
      .then(unittype => {
        if (!unittype) {
          return res.status(404).send({
            message: 'Category Not Found',
          });
        }
        return unittype
          .update({
            code: req.body.code || category.code,
            displayName: req.body.displayName || category.displayName,
          })
          .then(() => res.status(200).send(unittype))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return UnitTypes.findByPk(req.params.id)
      .then(unittype => {
        if (!unittype) {
          return res.status(400).send({
            message: 'Category Not Found',
          });
        }
        return unittype
          .destroy()
          .then(() => res.status(200).send(unittype))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};

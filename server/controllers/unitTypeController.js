const UnitTypes = require('../models').unittypes;

module.exports = {
  list(req, res) {
    return UnitTypes.findAll({
      include: [],
      order: [['createdAt', 'DESC']],
    })
      .then(unitTypes => res.status(200).send(unitTypes))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return UnitTypes.findByPk(req.params.id)
      .then(unitTypes => {
        if (!unitTypes) {
          return res.status(404).send({
            message: 'unitTypes Not Found',
          });
        }
        return res.status(200).send(unitTypes);
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
      .then(unitTypes => {
        if (!unitTypes) {
          return res.status(404).send({
            message: 'unitTypes Not Found',
          });
        }
        return unitTypes
          .update({
            code: req.body.code || unitTypes.code,
            displayName: req.body.displayName || unitTypes.displayName,
          })
          .then(() => res.status(200).send(unitTypes))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return UnitTypes.findByPk(req.params.id)
      .then(unitTypes => {
        if (!unitTypes) {
          return res.status(400).send({
            message: 'unitTypes Not Found',
          });
        }
        return unitTypes
          .destroy()
          .then(() => res.status(200).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};

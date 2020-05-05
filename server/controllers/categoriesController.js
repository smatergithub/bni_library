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
};

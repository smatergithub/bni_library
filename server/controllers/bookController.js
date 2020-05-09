const Books = require('../models').books;

module.exports = {
  list(req, res) {
    return Books.findAll({
      include: ['unittypes', 'categories'],
      order: [['createdAt', 'DESC']],
    })
      .then(books => res.status(200).send(books))
      .catch(error => {
        res.status(400).send(error);
      });
  },
};

const Users = require('../models').users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  if (req.body.email === undefined) {
    res.status(201).send({
      message: 'Email Not Found',
    });
    return;
  }

  // Email
  Users.findOne({
    where: {
      email: req.body.email,
    },
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Email is already in use!',
      });
      return;
    }

    next();
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;

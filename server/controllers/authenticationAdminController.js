const Admins = require('../models').admins;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/auth-config');

module.exports = {
  register(req, res) {
    Admins.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      address: req.body.address,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: bcrypt.hashSync(req.body.password, 8),
      isAdmin: true,
    })
      .then(response => {
        res.send({ message: 'User was registered successfully!' });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  },

  login(req, res) {
    Admins.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'User Not found.' });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: 'Invalid Password!',
          });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // 24 hours
        });
        res.status(200).send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          address: user.address,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          accessToken: token,
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  },
};

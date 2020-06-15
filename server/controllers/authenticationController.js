const Users = require('../models').users;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/auth-config');

module.exports = {
  register(req, res) {
    Users.create({
      name: req.body.name,
      email: req.body.email,
      superAdmin: true,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then(response => {
        res.send({ message: 'User was registered successfully!' });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  },

  login(req, res) {
    Users.findOne({
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

        var token = jwt.sign(
          { id: user.id, isAdmin: user.isAdmin, superAdmin: user.superAdmin },
          config.secret,
          {
            expiresIn: 86400, // 24 hours
          }
        );
        res.status(200).send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          address: user.address,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          superAdmin: user.superAdmin,
          accessToken: token,
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  },

  profileUser(req, res) {
    var userId = req.userId;
    Users.findOne({
      where: {
        id: userId,
      },
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'User Not found.' });
        }
        let dataUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          address: user.address,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          superAdmin: user.superAdmin,
        };
        res.status(200).send(dataUser);
      })
      .catch(error => res.status(400).send(error));
  },
};

const Users = require('../models').users;
const VerificationUser = require('../models').verificationToken;
const cryptoRandomString = require('crypto-random-string');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

require('dotenv').config();

module.exports = {
  register: async (req, res) => {
    Users.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then(user => {
        VerificationUser.create({
          userId: user.id,
          token: cryptoRandomString({ length: 16, type: 'base64' }),
        })
          .then(verification => {
            res.send({
              message: 'account was registered successfully!',
              dataToken: verification.token,
            });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  },

  login: async (req, res) => {
    Users.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'User Not found.' });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            message: 'Invalid Password!',
          });
        }

        var token = jwt.sign(
          { id: user.id, isAdmin: user.isAdmin, superAdmin: user.superAdmin },
          process.env.SECRET_TOKEN,
          {
            expiresIn: 86400, // 24 hours
          }
        );
        res.status(200).send({
          id: user.id,
          name: user.name,
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

  verificationAccount: async (req, res) => {
    Users.findOne({
      where: { email: req.query.email },
    })
      .then(user => {
        if (user.isVerified) {
          return res.status(202).json(`Email Already Verified`);
        } else {
          VerificationUser.findOne({
            where: { token: req.query.verificationToken },
          })
            .then(foundToken => {
              if (foundToken) {
                console.log('query foundToken', foundToken);
                Users.update({ isVerified: true })
                  .then(updateUser => {
                    return res.status(403).json(`User with ${user.email} has been verified`);
                  })
                  .catch(reason => {
                    return res.status(403).json(`Verification failed`);
                  });
              } else {
                return res.status(404).json(`Token expired 1111`);
              }
            })
            .catch(err => {
              return res.status(404).send(err);
            });
        }
      })
      .catch(reason => {
        return res.status(404).json(`Email not found`);
      });
  },

  profileUser: async (req, res) => {
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
          name: user.name,
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

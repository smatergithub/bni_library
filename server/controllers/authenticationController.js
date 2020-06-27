const Users = require('../models').users;
const VerificationUser = require('../models').verificationToken;
const cryptoRandomString = require('crypto-random-string');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

require('dotenv').config();

module.exports = {

  register: async (req, res) => {
    Users.create({
      nama: req.body.nama,
      email: req.body.email,
      tanggalLahir: req.body.tanggalLahir,
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

  verificationAccount: async (req, res) => {
    Users.findOne({
      where: { email: req.query.email },
    })
      .then(user => {
        if (!user.isVerified) {
          VerificationUser.findOne({
            where: { token: req.query.verificationToken },
          })
            .then(foundToken => {
              if (foundToken) {
                Users.update({ isVerified: true })
                  .then(updateUser => {
                    return res.status(403).json(`User with ${user.email} has been verified`);
                  })
                  .catch(reason => {
                    return res.status(403).json({ message: "Verification failed" });
                  });
              } else {
                return res.status(404).json({ message: "Token expired " });
              }
            })
            .catch(err => {
              return res.status(404).send(err);
            });

        } else {
          return res.status(400).json({ message: "Email Not Found" });
        }
      })
      .catch(err => {
        return res.status(404).json({ message: err });
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
          email: user.email,
          accessToken: token,
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  },

};

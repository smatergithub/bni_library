const Users = require('../models').users;
const VerificationToken = require('../models').verificationToken;
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
      isVerified: false,
      isAdmin: false,
      superAdmin: false
    })
      .then(user => {
        VerificationToken.create({
          userId: user.id,
          token: cryptoRandomString({ length: 20 }),
        })
          .then(verification => {
            res.status(203).send({
              message: 'account was registered successfully!',
              dataToken: verification.token,
            });
          })
          .catch(err => {
            res.status(404).send({ message: "failed registered account" });
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
          return res.status(404).json({ message: "Email Already verified" });
        }
        VerificationToken.findOne({
          where: { token: req.query.token, userId: user.id },
        })
          .then(foundToken => {
            if (!foundToken) {
              return res.status(404).json({ message: "Token expired " });
            }
            user.update({ isVerified: true })
              .then(updateUser => {
                return res.status(200).json(`User with ${user.email} has been verified`);
              })
              .catch(err => {
                return res.status(404).json({ message: "Verification failed" });
              });
          })
          .catch(err => {
            return res.status(500).json({ message: "error disni gan" });
          });

      })
      .catch(err => {
        return res.status(500).json({ message: err });
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
          return res.status(404).send({
            message: 'Invalid Password!',
          });
        }

        if (!user.isVerified) {
          return res.status(404).send({ message: 'User Not Verification.' });
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

const Users = require('../models').users;
const VerificationToken = require('../models').verificationToken;
const cryptoRandomString = require('crypto-random-string');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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
      superAdmin: false,
    })
      .then(user => {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1 / 24);
        VerificationToken.create({
          userId: user.id,
          token: cryptoRandomString({ length: 20 }),
          expiredDateToken: expireDate,
        })
          .then(verification => {
            res.status(203).send({
              message: 'account was registered successfully!',
              verificationToken: verification.token,
              expiredDateToken: verification.expiredDateToken,
            });
          })
          .catch(err => {
            res.status(404).send({ message: 'failed registered account' });
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
          return res.status(404).json({ message: 'Email Already verified' });
        }

        VerificationToken.destroy({
          where: {
            expiredDateToken: { [Op.lt]: Sequelize.fn('CURDATE') },
          },
        });

        var recordToken = VerificationToken.findOne({
          where: { token: req.query.token, userId: user.id },
        });

        if (recordToken) {
          user
            .update({ isVerified: true })
            .then(updateUser => {
              return res.status(200).json({ message: `User with ${user.email} has been verified` });
            })
            .catch(err => {
              return res.status(404).json({ message: 'Verification failed' });
            });
        } else {
          return res.status(404).json({ message: 'Token expired ' });
        }
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
          role: user.superAdmin === 1 ? '3' : user.isAdmin === 1 ? '2' : '1',
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  },

  resetPassword: async (req, res) => {
    await Users.findOne({
      where: {
        email: req.body.email,
      },
    }).then(user => {
      console.log('user', user);
      VerificationToken.findOne({
        where: {
          userId: user.id,
        },
      }).then(verificationToken => {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1 / 24);
        verificationToken
          .update({
            resetToken: cryptoRandomString({ length: 20 }),
            expiredDateResetToken: expireDate,
          })
          .then(response => {
            res.status(200).json({
              resetToken: response.resetToken,
              expiredDateResetToken: response.expiredDateResetToken,
            });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      });
    });
  },

  updatePassword: async (req, res) => {
    Users.findOne({
      where: { email: req.query.email },
    })
      .then(user => {
        VerificationToken.destroy({
          where: {
            expiredDateResetToken: { [Op.lt]: Sequelize.fn('CURDATE') },
          },
        });

        var recordResetToken = VerificationToken.findOne({
          where: {
            resetToken: req.query.resetToken,
            userId: user.id,
          },
        });

        if (recordResetToken) {
          if (req.body.confirmPassword !== req.body.password) {
            return res.status(404).json({ message: 'Passwords do not match. Please try again.' });
          }
          user.update(
            {
              password: bcrypt.hashSync(req.body.password, 8),
            },
            {
              where: {
                email: req.query.email,
              },
            }
          );
          return res.status(200).json({ message: 'Succesfully Update Password' });
        }
      })
      .catch(err => {
        return res.status(500).json({ message: err });
      });
  },
};

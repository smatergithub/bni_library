const Users = require('../models').users;
const VerificationToken = require('../models').verificationToken;
const cryptoRandomString = require('crypto-random-string');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const send = require('../utils/sendMail');
const { setJWTCookieOption } = require('../utils/setCookies');

require('dotenv').config();

module.exports = {
  register: async (req, res) => {
    Users.scope('withPassword')
      .create({
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
            send.sendMailRegister({
              link: `${process.env.PUBLIC_URL}/auth/activation?email=${req.body.email}&token=${verification.token} `,
              name: req.body.nama,
              email: req.body.email,
              btn_title: 'Verif email address',
              text:
                'Youre almost ready to start enjoying E-BNI LIBRARY. Simply click the yellow button below to verify your email address.',
            });

            res.status(201).send({
              message: 'account was registered successfully!',
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
    Users.scope('withPassword')
      .findOne({
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
    Users.scope('withPassword')
      .findOne({
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
        res.cookie('access_token', token, setJWTCookieOption());
        res.status(200).send({
          email: user.email,

          role: user.superAdmin ? '3' : user.isAdmin ? '2' : '1',
          isAdmin: user.isAdmin,
          superAdmin: user.superAdmin,
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  },

  resetPassword: async (req, res) => {
    await Users.scope('withPassword')
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then(user => {
        VerificationToken.findOne({
          where: {
            userId: user.id,
          },
        })
          .then(verificationToken => {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1 / 24);
            verificationToken
              .update({
                resetToken: cryptoRandomString({ length: 20 }),
                expiredDateResetToken: expireDate,
              })
              .then(response => {
                // if (process.env.NODE_ENV !== 'development') {
                send.sendResetPasswordLink({
                  link: `${process.env.PUBLIC_URL}/auth/reset-password?email=${req.body.email}&token=${response.resetToken} `,
                  name: '',
                  email: req.body.email,
                  btn_title: 'Password Reset',
                  text:
                    'You requested a password reset. Please use the button below to continue the process.',
                });
                // }
                res.status(200).json({ message: 'success' });
              })
              .catch(err => {
                res.status(200).send({ message: 'success' });
              });
          })
          .catch(err => {
            res.status(200).send({ message: 'success' });
          });
      })
      .catch(err => {
        res.status(200).send({ message: 'success' });
      });
  },

  updatePassword: async (req, res) => {
    Users.scope('withPassword')
      .findOne({
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
  logout: async (req, res) => {
    res.cookie('access_token', { maxAge: 0 });
    res.status(200).send({ message: 'success' });
  },
  contactUs: async (req, res) => {
    // if (process.env.NODE_ENV !== 'development') {
    send.sendFeedback({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    // }
    res.status(200).json({ message: 'success' });
  },
};

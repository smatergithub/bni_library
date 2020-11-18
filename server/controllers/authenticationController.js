const Users = require('../models').users;
const fetch = require('node-fetch');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const send = require('../utils/sendMail');
const { setJWTCookieOption } = require('../utils/setCookies');
require('dotenv').config();

module.exports = {
  login: async (req, res) => {
    let url = `https://digihc.bnicorpu.co.id/login_user/${req.body.npp}/${req.body.password}`;
    fetch(url)
      .then(res => res.json())
      .then(response => {
        if (response.status === 200) {
          checkIfUserAlreadyCreateOnDb(response.message[0], req.body.password);
        }
        if (response.status === 401) {
          res.status(402).send({ message: response.message });
        }
      })
      .catch(err => {
        res.status(500).send({ message: 'Terjadi kesalahan' });
      });

    async function checkIfUserAlreadyCreateOnDb(userObj, password) {
      return await Users.scope('withPassword')
        .findOne({
          where: {
            npp: userObj.npp,
          },
        })
        .then(async user => {
          if (!user) {
            // res.status(200).send({ message: 'sukses' });
            return await Users.create({
              nama: userObj.nama,
              email: userObj.email,
              npp: userObj.npp,
              tgl_lahir: userObj.tgl_lahir,
              wilayah: userObj.wilayah,
              singkatan: userObj.singkatan,
              kdunit: userObj.kdunit,
              unit_besaran: userObj.unit_besaran,
              jenjang: userObj.jenjang,
              password: bcrypt.hashSync(password, 8),
              jabatan: userObj.jabatan,
              email: userObj.email,
              url_img: userObj.url_img,
              isAdmin: false,
              superAdmin: false,
            })
              .then(res_user => {
                return res.status(200).send({ message: 'firstLogin' });
              })
              .catch(err => {
                res.status(500).send({ message: err.message });
              });
          }

          var passwordIsValid = bcrypt.compareSync(password, user.password);
          if (!passwordIsValid) {
            return res.status(404).send({
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
    }

    async function createNewUser(userData, password) {
      let response = await Users.scope('withPassword')
        .create({
          nama: userData.nama,
          email: userData.email,
          npp: userData.npp,
          tgl_lahir: userData.tgl_lahir,
          wilayah: userData.wilayah,
          singkatan: userData.singkatan,
          kdunit: userData.kdunit,
          unit_besaran: userData.unit_besaran,
          jenjang: userData.jenjang,
          password: bcrypt.hashSync(password, 8),
          jabatan: userData.jabatan,
          email: userData.email,
          url_img: userData.url_img,
          isAdmin: false,
          superAdmin: false,
        })
        .then(res_user => {
          res.status(200).send({ message: 'sukses' });
          // var expireDate = new Date();
          // expireDate.setDate(expireDate.getDate() + 1 / 24);
          // VerificationToken.create({
          //   userId: res_user.id,
          //   token: cryptoRandomString({ length: 20 }),
          //   expiredDateToken: expireDate,
          // })
          //   .then(res => {
          //     res.status(200).send({
          //       message: 1,
          //     });
          //   })
          //   .catch(err => {
          //     res.status(500).send({ message: err.message });
          //   });
        })
        .catch(err => {
          console.log('inikan?');
          res.status(500).send({ message: err.message });
        });
      res.status(200).send({ message: response });
    }
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

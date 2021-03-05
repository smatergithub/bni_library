const Users = require('../models').users;
const fetch = require('node-fetch');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const send = require('../utils/sendMail');
// const { setJWTCookieOption } = require('../utils/setCookies');
require('dotenv').config();

module.exports = {
  // login: async(req, res) => {
  //     let url = `https://digihc.bnicorpu.co.id/login_user/${req.body.npp}/${req.body.password}`;
  //     fetch(url)
  //         .then(res => res.json())
  //         .then(response => {
  //             if (response.status === 200) {
  //                 checkIfUserAlreadyCreateOnDb(response.message[0], req.body.password);
  //             }
  //             if (response.status === 401) {
  //                 res.status(402).send({ message: response.message });
  //             }
  //         })
  //         .catch(err => {
  //             // res.status(500).send({ message: 'Terjadi kesalahan Sistem Internal digihc server' });
  //             checkIfUserAlreadyCreateOnDb({ nama: 'testtt', npp: req.body.npp }, req.body.password)
  //         });

  login: async (req, res) => {
    let url = `https://digihc.bnicorpu.co.id/login_user/${req.body.npp}/${req.body.password}`;
    fetch(url)
      .then(res => res.json())
      .then(response => {
        if (response.status === 200) {
          checkIfUserAlreadyCreateOnDb(response.message[0], req.body.password);
        }
        if (response.status === 401) {
          // checkIfUserAlreadyCreateOnDb({
          //   npp: 'D000001'
          // }, 'password');
          res.status(402).send({ message: response.message });
        }
        console.log(response);
      })
      .catch(err => {
        res.status(500).send({ message: 'Terjadi kesalahan Sistem Internal digihc server' });
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
              unit: userObj.unit,
              unit_besaran: userObj.unit_besaran,
              jenjang: userObj.jenjang,
              password: bcrypt.hashSync(password, 8),
              jabatan: userObj.jabatan,
              email: userObj.email,
              url_img: userObj.url_img,
              isAdmin: false,
              superAdmin: false,
              isRepoAdmin: false,
            })
              .then(res_user => {
                return res.status(200).send({ message: 'firstLogin' });
              })
              .catch(err => {
                res.status(500).send({ message: err.message });
              });
          } else {
            var passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
              user
                .update({
                  password: bcrypt.hashSync(password, 8),
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
                      unit: userObj.unit,
                      unit_besaran: userObj.unit_besaran,
                      jenjang: userObj.jenjang,
                      password: bcrypt.hashSync(password, 8),
                      jabatan: userObj.jabatan,
                      email: userObj.email,
                      url_img: userObj.url_img,
                      isAdmin: false,
                      superAdmin: false,
                      isRepoAdmin: false,
                    })
                      .then(res_user => {
                        return res.status(200).send({ message: 'firstLogin' });
                      })
                      .catch(err => {
                        res.status(500).send({ message: err.message });
                      });
                  } else {
                    var passwordIsValid = bcrypt.compareSync(password, user.password);
                    if (!passwordIsValid) {
                      user
                        .update({
                          password: bcrypt.hashSync(password, 8),
                        })
                        .then(() => {
                          return res.status(200).send({ message: 'firstLogin' });
                        })
                        .catch(err => {
                          res.status(500).send({ message: err.message });
                        });
                    } else {
                      user
                        .update({
                          nama: userObj.nama,
                          email: userObj.email,
                          npp: userObj.npp,
                          tgl_lahir: userObj.tgl_lahir,
                          wilayah: userObj.wilayah,
                          singkatan: userObj.singkatan,
                          kdunit: userObj.kdunit,
                          unit: userObj.unit,
                          unit_besaran: userObj.unit_besaran,
                          jenjang: userObj.jenjang,
                          password: bcrypt.hashSync(password, 8),
                          jabatan: userObj.jabatan,
                          email: userObj.email,
                          url_img: userObj.url_img,
                        })
                        .then(() => {
                          return res.status(200).send({ message: 'firstLogin' });
                        })
                        .catch(err => {
                          res.status(500).send({ message: err.message });
                        });
                    }
                    var token = jwt.sign(
                      {
                        id: user.id,
                        isAdmin: user.isAdmin,
                        isRepoAdmin: user.isRepoAdmin,
                        superAdmin: user.superAdmin,
                      },
                      process.env.SECRET_TOKEN,
                      {
                        expiresIn: 26400, // 24 hours
                      }
                    );
                    // res.cookie('access_token', token, setJWTCookieOption());
                    res.status(200).send({
                      accessToken: token,
                      email: user.email,
                      role: user.superAdmin ? '3' : user.isAdmin ? '2' : '1',
                      isRepoAdmin: user.isRepoAdmin ? 1 : 0,
                    });
                  }
                })
                .catch(err => {
                  res.status(500).send({ message: err.message });
                });
            } else {
              user
                .update({
                  nama: userObj.nama,
                  email: userObj.email,
                  npp: userObj.npp,
                  tgl_lahir: userObj.tgl_lahir,
                  wilayah: userObj.wilayah,
                  singkatan: userObj.singkatan,
                  kdunit: userObj.kdunit,
                  unit: userObj.unit,
                  unit_besaran: userObj.unit_besaran,
                  jenjang: userObj.jenjang,
                  password: bcrypt.hashSync(password, 8),
                  jabatan: userObj.jabatan,
                  email: userObj.email,
                  url_img: userObj.url_img,
                })
                .then(() => {
                  return res.status(200).send({ message: 'firstLogin' });
                })
                .catch(err => {
                  res.status(500).send({ message: err.message });
                });
            }
            var token = jwt.sign(
              {
                id: user.id,
                isAdmin: user.isAdmin,
                isRepoAdmin: user.isRepoAdmin,
                superAdmin: user.superAdmin,
              },
              process.env.SECRET_TOKEN,
              {
                expiresIn: 26400, // 24 hours
              }
            );
            // res.cookie('access_token', token, setJWTCookieOption());
            res.status(200).send({
              accessToken: token,
              email: user.email,
              role: user.superAdmin ? '3' : user.isAdmin ? '2' : '1',
              isRepoAdmin: user.isRepoAdmin ? 1 : 0,
            });
          }
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    }
  },

  logout: async (req, res) => {
    // res.cookie('access_token', 'delete', { maxAge: 0, httpOnly: 'true' });
    res.status(200).send({ message: 'success' });
  },
  isTokenValid: async (req, res) => {
    let token = req.query.token;

    if (!token) {
      // do not remove the message, because it will be effected on client side
      // 0 = no token provide or the token no longer active, we need to remove token from localstorage
      // 1 = the token still alive so don't need to remove localStorage
      res.status(200).send({ message: '0' });
    }

    const isTokenActive = jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
    if (isTokenActive) {
      res.status(200).send({ message: '1' });
    } else {
      res.status(200).send({ message: '0' });
    }
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

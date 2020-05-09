const jwt = require('jsonwebtoken');
const config = require('../config/auth-config');
const Admins = require('../models').admins;

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.id = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  } else {
    Admins.findOne({
      where: {
        isAdmin: true,
      },
    })
      .then(req => {
        jwt.verify(token, config.secret, (err, decoded) => {
          if (err) {
            return res.status(401).send({
              message: 'Unauthorized Not Admin!',
            });
          }
          req.id = decoded.id;
          next();
        });
      })
      .catch(err => {
        return res.status(401).send({
          message: 'Unauthorized!',
        });
      });
  }
};

const authenticationJWT = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = authenticationJWT;

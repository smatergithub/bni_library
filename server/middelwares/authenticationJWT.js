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
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
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
    Admins.findOne({
      where: {
        isAdmin: true,
      },
    })
      .then(res => {
        req.adminId = decoded.id;
        next();
      })
      .catch(err => {
        return res.status(401).send({
          message: 'Unauthorized! Not Admin',
        });
      });
  });
};

const authenticationJWT = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = authenticationJWT;

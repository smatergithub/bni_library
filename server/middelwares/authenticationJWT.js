const jwt = require('jsonwebtoken');
const config = require('../config/auth-config');

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
    req.adminId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    if (req.isAdmin !== true) return res.status(500).json({ message: "your are not allowed for this feature" });
    next();
  });
};

const authenticationJWT = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = authenticationJWT;

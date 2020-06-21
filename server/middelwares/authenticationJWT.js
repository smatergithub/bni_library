const jwt = require('jsonwebtoken');
require('dotenv').config();

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
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
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    if (req.isAdmin !== true)
      return res.status(500).json({ message: 'your are not allowed for this feature' });
    next();
  });
};

isSuperAdmin = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    req.superAdmin = decoded.superAdmin;
    if (req.isAdmin !== true && req.superAdmin !== true)
      return res.status(500).json({ message: 'your are not allowed for this feature' });
    next();
  });
};

const authenticationJWT = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isSuperAdmin: isSuperAdmin,
};
module.exports = authenticationJWT;

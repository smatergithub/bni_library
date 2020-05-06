var express = require('express');
var router = express.Router();
var { verifySignUp, AuthJWT } = require('../middelwares');

const AuthenticationController = require('../controllers/authenticationController');
const CategoriesController = require('../controllers/categoriesController');

router.post(
  '/api/auth/register',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  AuthenticationController.register
);
router.post('/api/auth/login', AuthenticationController.login);

router.get('/api/categories', [AuthJWT.verifyToken], CategoriesController.list);

module.exports = router;

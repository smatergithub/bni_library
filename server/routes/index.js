var express = require('express');
var router = express.Router();
var { verifySignUp, AuthJWT } = require('../middelwares');
var { options } = require('../config/docSwagger');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

//document API

const specs = swaggerJsdoc(options);
router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(specs, { explorer: true }));

//controller
const AuthenticationController = require('../controllers/authenticationController');
const AuthenticationAdminController = require('../controllers/authenticationAdminController');
const CategoriesController = require('../controllers/categoriesController');
const UnitTypeController = require('../controllers/unitTypeController');

//routing controller
router.post(
  '/api/auth/register',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  AuthenticationController.register
);
router.post('/api/auth/login', AuthenticationController.login);

router.post(
  '/api/admin/register',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  AuthenticationAdminController.register
);
router.post('/api/admin/login', AuthenticationAdminController.login);

router.get('/api/categories', [AuthJWT.isAdmin], CategoriesController.list);
router.get('/api/categories/:id', [AuthJWT.isAdmin], CategoriesController.getById);
router.post('/api/categories', [AuthJWT.isAdmin], CategoriesController.add);
router.put('/api/categories/:id', [AuthJWT.isAdmin], CategoriesController.update);
router.delete('/api/categories/:id', [AuthJWT.isAdmin], CategoriesController.delete);

router.get('/api/unittypes', [AuthJWT.isAdmin], UnitTypeController.list);
router.get('/api/unittypes/:id', [AuthJWT.isAdmin], UnitTypeController.getById);
router.post('/api/unittypes', [AuthJWT.isAdmin], UnitTypeController.add);
router.put('/api/unittypes/:id', [AuthJWT.isAdmin], UnitTypeController.update);
router.delete('/api/unittypes/:id', [AuthJWT.isAdmin], UnitTypeController.delete);

module.exports = router;

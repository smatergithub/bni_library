var express = require('express');
var router = express.Router();

const CategoriesController = require('../controllers').categories;

router.get('/api/categories', CategoriesController.list);

module.exports = router;

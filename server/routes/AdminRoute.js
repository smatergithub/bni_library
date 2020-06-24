var express = require('express');
var router = express.Router();
var { verifySignUp, AuthJWT } = require('../middelwares');

const BookController = require('../controllers/BookController');
const EbookController = require('../controllers/EbookController');
const UserController = require('../controllers/UserController');
const RepositoryController = require('../controllers/RepositoryController');
const TransactionBookController = require('../controllers/TransactionBookController');
const TransactionEbookController = require('../controllers/TransactionEbookController');

router.get('/users', [AuthJWT.isAdmin], UserController.list);
router.post('/users/:id', [AuthJWT.isAdmin, AuthJWT.isSuperAdmin], UserController.toggleUserIsAdmin);

//routing admin panel feature

router.get('/book', [AuthJWT.isAdmin], BookController.list);
router.get('/book/:id', [AuthJWT.isAdmin], BookController.getById);
router.post('/book', [AuthJWT.isAdmin], BookController.add);
router.put('/book/:id', [AuthJWT.isAdmin], BookController.update);
router.delete('/book/:id', [AuthJWT.isAdmin], BookController.delete);

router.get('/ebook', [AuthJWT.isAdmin], EbookController.list);
router.get('/ebook/:id', [AuthJWT.isAdmin], EbookController.getById);
router.post('/ebook', [AuthJWT.isAdmin], EbookController.add);
router.put('/ebook/:id', [AuthJWT.isAdmin], EbookController.update);
router.delete('/ebook/:id', [AuthJWT.isAdmin], EbookController.delete);

router.get('/repository', [AuthJWT.isAdmin], RepositoryController.list);
router.get('/repository/:id', [AuthJWT.isAdmin], RepositoryController.getById);
router.post('/repository', [AuthJWT.isAdmin], RepositoryController.add);
router.delete('/repository/:id', [AuthJWT.isAdmin], RepositoryController.delete);

router.get('/transaction-book', [AuthJWT.isAdmin], TransactionBookController.list);
router.post('/transaction-book/return/:transactionId', [AuthJWT.isAdmin], TransactionBookController.returnABook);


router.get('/transaction-ebook', [AuthJWT.isAdmin], TransactionEbookController.list);
router.post('/transaction-ebook/return/:transactionId', [AuthJWT.isAdmin], TransactionEbookController.returnEbook);

module.exports = router;

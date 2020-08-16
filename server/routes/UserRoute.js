var express = require('express');
var router = express.Router();
var { verifySignUp, AuthJWT } = require('../middelwares');

//controller
const AuthenticationController = require('../controllers/AuthenticationController');
const ProfileUserController = require("../controllers/ProfileUserController");
const BookController = require('../controllers/BookController');
const EbookController = require('../controllers/EbookController');
const DataSourceFilterBookController = require("../controllers/dataSourceFilterBookController");
const DataSourceFilterEbookController = require("../controllers/dataSourceFilterEbookController");
const TransactionBookController = require('../controllers/TransactionBookController');
const TransactionEbookController = require('../controllers/TransactionEbookController');
const RatingBookController = require("../controllers/ratingBookController");
const RatingEbookController = require("../controllers/ratingEbookController");

router.post('/book/list', BookController.getBookList);
router.get('/book/detail/:id', BookController.getBookById);

router.get('/categoryBook', DataSourceFilterBookController.getCategory);
router.get('/tahunTerbitBook', DataSourceFilterBookController.getTahunTerbit);


router.post('/ebook/list', EbookController.getEbookList);
router.get('/ebook/detail/:id', EbookController.getEbookById);

router.get('/categoryEbook', DataSourceFilterEbookController.getCategory);
router.get('/tahunTerbitEbook', DataSourceFilterEbookController.getTahunTerbit);


router.post('/register', [verifySignUp.checkDuplicateUsernameOrEmail], AuthenticationController.register);
router.post('/login', AuthenticationController.login);
router.post('/verification', AuthenticationController.verificationAccount);
router.post('/resetPassword', AuthenticationController.resetPassword);
router.post('/updatePassword', AuthenticationController.updatePassword);
router.get('/profile/me', [AuthJWT.verifyToken], ProfileUserController.profileUser);
router.post('/profile/updateProfile', [AuthJWT.verifyToken], ProfileUserController.updateProfile);
router.get("/profile/listBorrowBook", [AuthJWT.verifyToken], ProfileUserController.listBorrowBookUser)
router.get("/profile/listBorrowEbook", [AuthJWT.verifyToken], ProfileUserController.listBorrowEbookUser)

router.post('/transactionBook/borrowBook', [AuthJWT.verifyToken], TransactionBookController.borrowBook);
router.post('/transactionEbook/borrowEbook', [AuthJWT.verifyToken], TransactionEbookController.borrowEbook);


router.post('/ratingBook', [AuthJWT.verifyToken], RatingBookController.inputRatingBook);
router.post('/ratingEBook', [AuthJWT.verifyToken], RatingEbookController.inputRatingBook);

module.exports = router;

var express = require('express');
var router = express.Router();
var { verifySignUp, AuthJWT } = require('../middelwares');

//controller
const AuthenticationController = require('../controllers/AuthenticationController');
const ProfileUserController = require("../controllers/ProfileUserController");
const BookController = require('../controllers/BookController');
const EbookController = require('../controllers/EbookController');
const TransactionBookController = require('../controllers/TransactionBookController');
const TransactionEbookController = require('../controllers/TransactionEbookController');


router.get('/book/list', BookController.list);
router.get('/book/detail/:id', BookController.getById);

router.get('/ebook/list', EbookController.list);
router.get('/ebook/detail/:id', EbookController.getById);


router.post('/register', [verifySignUp.checkDuplicateUsernameOrEmail], AuthenticationController.register);
router.post('/login', AuthenticationController.login);
router.post('/verification', AuthenticationController.verificationAccount);
router.post('/resetPassword', AuthenticationController.resetPassword);
router.post('/updatePassword', AuthenticationController.updatePassword);
router.get('/profile/me', [AuthJWT.verifyToken], ProfileUserController.profileUser);
router.post('/profile/updateProfile', [AuthJWT.verifyToken], ProfileUserController.updateProfile);
router.get("/profile/listBorrowBook", [AuthJWT.verifyToken], ProfileUserController.listBorrowBookUser)

router.post('/transactionBook/borrowBook', [AuthJWT.verifyToken], TransactionBookController.borrowBook);
router.post('/transactionEbook/borrowEbook', [AuthJWT.verifyToken], TransactionEbookController.borrowEbook);

module.exports = router;

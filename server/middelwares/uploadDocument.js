const multer = require('multer');
const path = require('path');

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('excel') ||
    file.mimetype.includes('spreadsheetml') ||
    file.mimetype.includes('pdf')
  ) {
    cb(null, true);
  } else {
    cb('Please upload only excel file.', false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/server/public/document/');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// const storage = multer.diskStorage({
//   destination: path.join(__dirname + './../public/documentBook/'),
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;

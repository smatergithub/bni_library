const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname + './../public/documentRepository/'),
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    //cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('excel') ||
    file.mimetype.includes('spreadsheetml') ||
    file.mimetype.includes('application/pdf')
  ) {
    cb(null, true);
  } else {
    cb('Please upload only excel file.', false);
  }
};

const MultipleUploadDocument = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
  // fileFilter: fileFilter,
}).fields([
  { name: 'document', maxCount: 1 },
  { name: 'abstrack', maxCount: 1 },
]);

module.exports = MultipleUploadDocument;

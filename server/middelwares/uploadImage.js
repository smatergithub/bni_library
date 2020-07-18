const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//   destination: path.join(__dirname + './../public/images/'),
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/server/public/images/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const Upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
})

module.exports = Upload;
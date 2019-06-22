const multer = require("multer");
const path = require("path");

const MAX_SIZE = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE }
});

module.exports = upload;

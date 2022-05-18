const multer = require("multer");
const { v1: uuidv1 } = require("uuid");

// appropriate file extension
const MINE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
// an obj with a bunch of pre-configured middlewares
const fileUpload = multer({
  // provide storage and limited image size
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      //get the extension
      const ext = MINE_TYPE_MAP[file.mimetype];
      cb(null, uuidv1() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    // !! double-bang => convert null/ undefined to false
    const isValid = !!MINE_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error(`Invalid mime type`);
    cb(error, isValid);
  },
});

module.exports = fileUpload;

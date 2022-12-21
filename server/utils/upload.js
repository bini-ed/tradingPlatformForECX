const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const fileName =
      new Date().getTime() +
      "_" +
      file.originalname.toLowerCase().split(" ").join("-");

    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
});

module.exports = upload;

const multer = require("multer");
const path = require("path");
const fsPromises = require("fs").promises;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profile/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const profileUpload = multer({ storage: storage });
const deleteImageFromLocal = async (fileName) => {
  try {
    await fsPromises.unlink(path.join("./", "profile", fileName));
    return true;
  } catch (error) {
    console.log(`warning message:${error}`);
  }
};
module.exports = { profileUpload, deleteImageFromLocal };

const router = require("express").Router();
const { profileUpload } = require("../controllers/profileUploadController");
const {
  loginController,
  signupController,
  updateUserPassword,
} = require("../controllers/authController");
router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/reset", updateUserPassword);
module.exports = router;

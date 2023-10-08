const router = require("express").Router();
const {
  adminLoginController,
  updateAdminPassword,
  getUsersByAdmin,
  getAllUsersByAdminId,
} = require("../controllers/adminController");
router.post("/login", adminLoginController);
router.post("/updatepassword", updateAdminPassword);
router.get("/getUsersByAdmin/:id", getUsersByAdmin);
router.get("/getllusersbyadminid/:id", getAllUsersByAdminId);
module.exports = router;

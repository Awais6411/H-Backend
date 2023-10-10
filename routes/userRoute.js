const router = require("express").Router();
const {
  updateUserProfile,
  userAuctioneerListById,
  getAllAuctioneerList,
  updateUserAuctioneerList,
  getAllCarsByAuctioneerId,
  deleteUserAuctioneerCarsList,
} = require("../controllers/userController");
router.post("/updateprofile", updateUserProfile);
router.post("/auctioneerlist", userAuctioneerListById);
router.get("/allauctioneerlist", getAllAuctioneerList);
router.post("/updateuserauctioneerlist", updateUserAuctioneerList);
router.post("/deleteuserauctioneercarlist", deleteUserAuctioneerCarsList);
router.post("/allcarsbyauctioneerid", getAllCarsByAuctioneerId);
module.exports = router;

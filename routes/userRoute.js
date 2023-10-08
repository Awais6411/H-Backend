const router = require("express").Router();
const {
  updateUserProfile,
  userAuctioneerListById,
  getAllAuctioneerList,
  updateUserAuctioneerList,
  getAllCarsByAuctioneerId,
} = require("../controllers/userController");
router.post("/updateprofile", updateUserProfile);
router.get("/auctioneerlist/:id", userAuctioneerListById);
router.get("/allauctioneerlist", getAllAuctioneerList);
router.post("/updateuserauctioneerlist", updateUserAuctioneerList);
router.post("/allcarsbyauctioneerid", getAllCarsByAuctioneerId);
module.exports = router;

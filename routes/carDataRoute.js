const router = require("express").Router();
const { upload } = require("../controllers/imageUploadController");
const {
  getUserCarsData,
  createCarController,
  getCarImagesByCarId,
  getCarDetailsByCarId,
  updateUserAuctioneerCarsList,
  getUserCarsDataWithStatus,
} = require("../controllers/carDataController");

router.post("/updateuserauctioneercarlist", updateUserAuctioneerCarsList);
router.get("/carDetails/:id", getCarDetailsByCarId);
router.get("/carimages/:id", getCarImagesByCarId);
router.get("/usercars/:id", getUserCarsData);
router.get("/usercarswithstatus/:id", getUserCarsDataWithStatus);
router.route("/").post(upload.array("imageUrl"), createCarController);
router.route("/:id").get().patch().delete();
module.exports = router;

const express = require("express");
const {
  addBanner,
  getBanners,
  updateBanner,
  deleteBanner,
} = require("../controller/bannerController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/banner");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", upload.any(), addBanner);
router.get("/", getBanners);
router.put("/:id", upload.any(), updateBanner);
router.delete("/:id", deleteBanner);
module.exports = router;

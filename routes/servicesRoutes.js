const express = require("express");
const {
  addServices,
  getServices,
  updateServices,
  deleteServices,
} = require("../controller/servicesController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/services");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", upload.any(), addServices);
router.get("/", getServices);
router.put("/:id", upload.any(), updateServices);
router.delete("/:id", deleteServices);
module.exports = router;

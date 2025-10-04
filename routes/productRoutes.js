const express = require("express");
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controller/productController"); // updated controller
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/products"); // folder for product images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", upload.any(), addProduct);
router.get("/", getProducts);
router.put("/:id", upload.any(), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

const express = require("express");
const {
  addTestimonials,
  getTestimonials,
  updateTestimonials,
  deleteTestimonials,
} = require("../controller/testimonialsController");



const router = express.Router();

router.post("/", addTestimonials);
router.get("/", getTestimonials);
router.put("/:id", updateTestimonials);
router.delete("/:id", deleteTestimonials);
module.exports = router;

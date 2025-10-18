// const express = require("express");
// const {
//   addTestimonials,
//   getTestimonials,
//   updateTestimonials,
//   deleteTestimonials,
// } = require("../controller/testimonialsController");



// const router = express.Router();

// router.post("/", addTestimonials);
// router.get("/", getTestimonials);
// router.put("/:id", updateTestimonials);
// router.delete("/:id", deleteTestimonials);
// module.exports = router;

const express = require("express");
const {
  addTestimonials,
  getTestimonials,
  updateTestimonials,
  deleteTestimonials,
} = require("../controller/testimonialsController");
const multer = require("multer");

// Multer configuration for testimonials images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Multer destination called for file:", file.originalname);
    cb(null, "public/testimonials");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.originalname;
    console.log("Multer filename generated:", filename);
    cb(null, filename);
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log("File filter called for:", file.originalname, "MIME type:", file.mimetype);
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      console.log("File accepted:", file.originalname);
      cb(null, true);
    } else {
      console.log("File rejected:", file.originalname, "Invalid MIME type");
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Add middleware to log multer processing
const multerDebug = (req, res, next) => {
  console.log("=== MULTER DEBUG ===");
  console.log("Request body after multer:", req.body);
  console.log("Request file after multer:", req.file);
  console.log("Request files after multer:", req.files);
  next();
};

const router = express.Router();

// Test endpoint without multer
router.post("/test", (req, res) => {
  console.log("=== TEST ENDPOINT ===");
  console.log("Request body:", req.body);
  console.log("Request headers:", req.headers);
  res.json({ message: "Test endpoint hit", body: req.body });
});

router.post("/", upload.single("image"), multerDebug, addTestimonials);
router.get("/", getTestimonials);
router.put("/:id", upload.single("image"), updateTestimonials);
router.delete("/:id", deleteTestimonials);

module.exports = router;
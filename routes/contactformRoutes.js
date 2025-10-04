const express = require("express");
const {
  addContactform,
  getContactform,
  deleteContactform,
} = require("../controller/contactformController");



const router = express.Router();

router.post("/", addContactform);
router.get("/", getContactform);
router.delete("/:id", deleteContactform);
module.exports = router;

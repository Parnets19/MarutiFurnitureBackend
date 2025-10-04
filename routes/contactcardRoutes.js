const express = require("express");
const {
  addContactcard,
  getContactcard,
  updateContactcard,
  deleteContactcard,
} = require("../controller/contactcardController");



const router = express.Router();

router.post("/", addContactcard);
router.get("/", getContactcard);
router.put("/:id", updateContactcard);
router.delete("/:id", deleteContactcard);
module.exports = router;

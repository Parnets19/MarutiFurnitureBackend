const mongoose = require("mongoose");

const contactcardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    phone: {
      type: [String],
    },
    email: {
      type: [String],
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contactcard", contactcardSchema);

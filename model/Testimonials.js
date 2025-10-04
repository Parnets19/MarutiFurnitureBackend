const mongoose = require("mongoose");

const testimonialsSchema = new mongoose.Schema(
  {

    text: {
      type: String,
    },
    name: {
      type: String,
    },
    designation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Testimonials", testimonialsSchema);

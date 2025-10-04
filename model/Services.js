
const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    paragraph: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for better search performance
servicesSchema.index({ title: 'text', paragraph: 'text' });

module.exports = mongoose.model("Services", servicesSchema);
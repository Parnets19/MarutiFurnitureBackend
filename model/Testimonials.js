// const mongoose = require("mongoose");

// const testimonialsSchema = new mongoose.Schema(
//   {

//     text: {
//       type: String,
//     },
//     name: {
//       type: String,
//     },
//     designation: {
//       type: String,
//     },
//     rating: {
//       type: Number,
//       min: 1,
//       max: 5,
//       default: 5,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Testimonials", testimonialsSchema);

const mongoose = require("mongoose");

const testimonialsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Testimonials", testimonialsSchema);
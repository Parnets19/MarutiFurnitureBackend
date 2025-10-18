// const Testimonials = require("../model/Testimonials");

// // ➕ Add Testimonial
// exports.addTestimonials = async (req, res) => {
//   try {
//     const { text, name, designation, rating } = req.body;

//     const testimonials = new Testimonials({ text, name, designation, rating });
//     await testimonials.save();

//     res.status(201).json({ message: "Testimonial added successfully" });
//   } catch (error) {
//     console.error("Error adding testimonial:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // 📥 Get All Testimonials
// exports.getTestimonials = async (req, res) => {
//   try {
//     const testimonials = await Testimonials.find().sort({ createdAt: -1 });
//     res.status(200).json(testimonials);
//   } catch (error) {
//     console.error("Error fetching testimonials:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✏️ Update Testimonial
// exports.updateTestimonials = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { text, name, designation, rating } = req.body;

//     const updatedData = { text, name, designation, rating };

//     const updatedTestimonials = await Testimonials.findByIdAndUpdate(
//       id,
//       updatedData,
//       { new: true }
//     );

//     res.status(200).json({
//       message: "Testimonial updated successfully",
//       updatedTestimonials,
//     });
//   } catch (error) {
//     console.error("Error updating testimonial:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // 🗑️ Delete Testimonial
// exports.deleteTestimonials = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedTestimonials = await Testimonials.findByIdAndDelete(id);

//     res.status(200).json({
//       message: "Testimonial deleted successfully",
//       deletedTestimonials,
//     });
//   } catch (error) {
//     console.error("Error deleting testimonial:", error);
//     res.status(500).json({ message: error.message });
//   }
// };


const Testimonials = require("../model/Testimonials");
const fs = require('fs');
const path = require('path');

// ➕ Add Testimonial
exports.addTestimonials = async (req, res) => {
  try {
    console.log("=== ADD TESTIMONIAL DEBUG ===");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    console.log("Request headers:", req.headers);
    console.log("Content-Type:", req.get('Content-Type'));
    
    const { text, name, designation, rating } = req.body;
    console.log("Extracted fields:", { text, name, designation, rating });

    // Validate required fields
    if (!text || !name || !designation) {
      console.log("Validation failed - missing required fields");
      return res.status(400).json({ 
        message: "Text, name, and designation are required fields",
        received: { text, name, designation, rating }
      });
    }

    // Handle image upload
    const image = req.file ? req.file.filename : undefined;
    console.log("Image filename:", image);

    const testimonials = new Testimonials({ 
      text, 
      name, 
      designation, 
      rating: rating || 5, 
      image 
    });
    
    console.log("About to save testimonial:", testimonials);
    await testimonials.save();
    console.log("Testimonial saved successfully:", testimonials);

    res.status(201).json({ 
      message: "Testimonial added successfully",
      testimonial: testimonials 
    });
  } catch (error) {
    console.error("Error adding testimonial:", error);
    
    // Delete uploaded file if there was an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ message: error.message });
  }
};

// 📥 Get All Testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonials.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update Testimonial
exports.updateTestimonials = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, name, designation, rating } = req.body;

    // Validate required fields
    if (!text || !name || !designation) {
      return res.status(400).json({ 
        message: "Text, name, and designation are required fields" 
      });
    }

    // Find existing testimonial to handle image deletion if needed
    const existingTestimonial = await Testimonials.findById(id);
    if (!existingTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Handle image upload - if new image is uploaded, use it
    const image = req.file ? req.file.filename : undefined;

    const updatedData = { 
      text, 
      name, 
      designation, 
      rating: rating || 5 
    };

    // If new image uploaded, delete old image and use new one
    if (image && existingTestimonial.image) {
      const oldImagePath = path.join('public', 'testimonials', existingTestimonial.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      updatedData.image = image;
    } else if (image) {
      updatedData.image = image;
    }

    const updatedTestimonials = await Testimonials.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Testimonial updated successfully",
      updatedTestimonials,
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    
    // Delete uploaded file if there was an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ message: error.message });
  }
};

// 🗑️ Delete Testimonial
exports.deleteTestimonials = async (req, res) => {
  try {
    const { id } = req.params;
    
    const testimonial = await Testimonials.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Delete associated image file
    if (testimonial.image) {
      const imagePath = path.join('public', 'testimonials', testimonial.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const deletedTestimonials = await Testimonials.findByIdAndDelete(id);

    res.status(200).json({
      message: "Testimonial deleted successfully",
      deletedTestimonials,
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({ message: error.message });
  }
};
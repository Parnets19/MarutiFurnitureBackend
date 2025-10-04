const Testimonials = require("../model/Testimonials");

// ➕ Add Testimonial
exports.addTestimonials = async (req, res) => {
  try {
    const { text, name, designation } = req.body;

    const testimonials = new Testimonials({ text, name, designation });
    await testimonials.save();

    res.status(201).json({ message: "Testimonial added successfully" });
  } catch (error) {
    console.error("Error adding testimonial:", error);
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
    const { text, name, designation } = req.body;

    const updatedData = { text, name, designation };

    const updatedTestimonials = await Testimonials.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      message: "Testimonial updated successfully",
      updatedTestimonials,
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({ message: error.message });
  }
};

// 🗑️ Delete Testimonial
exports.deleteTestimonials = async (req, res) => {
  try {
    const { id } = req.params;
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

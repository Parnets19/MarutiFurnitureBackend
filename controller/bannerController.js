const Banner = require("../model/Banner");

exports.addBanner = async (req, res) => {
  try {
    const { title, text, description } = req.body;  // include description
    let image;
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.fieldname === "image") {
          image = `${file.filename}`;
        }
      });
    }
    const banner = new Banner({ title, text, description, image });  // add description here
    await banner.save();
    res.status(201).json({ message: "Banner added successfully" });
  } catch (error) {
    console.error("Error adding banner:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, description } = req.body;  // include description
    let image;
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.fieldname === "image") {
          image = `${file.filename}`;
        }
      });
    }
    const updatedData = { title, text, description };  // include description here
    if (image) {
      updatedData.image = image;
    }
    const updatedBanner = await Banner.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Banner updated successfully", updatedBanner });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBanner = await Banner.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Banner deleted successfully", deletedBanner });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({ message: error.message });
  }
};

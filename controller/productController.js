const Product = require("../model/Product");

exports.addProduct = async (req, res) => {
  try {
    const { title, paragraph, features } = req.body;
    let image;

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.fieldname === "image") {
          image = `${file.filename}`;
        }
      });
    }

    const product = new Product({
      title,
      paragraph,
      features: features ? (Array.isArray(features) ? features : features.split(",")) : [],
      image,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, paragraph, features } = req.body;
    let image;

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.fieldname === "image") {
          image = `${file.filename}`;
        }
      });
    }

    const updatedData = {
      title,
      paragraph,
      features: features ? (Array.isArray(features) ? features : features.split(",")) : [],
    };

    if (image) updatedData.image = image;

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: error.message });
  }
};

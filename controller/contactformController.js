const Contactform = require("../model/Contactform");

exports.addContactform = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body; // ✅ include phone
 
    if (!name || !email || !phone || !message) {
      return res
        .status(400)
        .json({ message: "All fields are required", received: req.body });
    }
    // Detailed logging

    // Trim and validate phone number
    const trimmedPhone = phone.toString().trim();
    if (!trimmedPhone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const contactform = new Contactform({
      name: name.trim(),
      email: email.trim(),
      phone: trimmedPhone,
      message: message.trim(),
    });
    await contactform.save();

    res.status(201).json({ message: "Contact form added successfully" });
  } catch (error) {
    console.error("Error adding contactform:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getContactform = async (req, res) => {
  try {
    const contactform = await Contactform.find();
    res.status(200).json(contactform);
  } catch (error) {
    console.error("Error fetching contactform:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteContactform = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContactform = await Contactform.findByIdAndDelete(id);
    res.status(200).json({
      message: "Contact form deleted successfully",
      deletedContactform,
    });
  } catch (error) {
    console.error("Error deleting Contactform:", error);
    res.status(500).json({ message: error.message });
  }
};

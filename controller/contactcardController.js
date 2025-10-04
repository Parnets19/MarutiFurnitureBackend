const Contactcard = require("../model/Contactcard");

exports.addContactcard = async (req, res) => {
  try {
    const { title, phone, email, address } = req.body;

    // if (!title || !phone?.length || !email?.length || !address) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }
    const contactcard = new Contactcard({ title, phone,email,address });
    await contactcard.save();
    res.status(201).json({ message: "Contactcard added successfully" });
  } catch (error) {
    console.error("Error adding contactcard:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getContactcard = async (req, res) => {
  try {
    const contactcard = await Contactcard.find().sort({ creaditedAt: -1 });
    res.status(200).json(contactcard);
  } catch (error) {
    console.error("Error fetching contactcard:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateContactcard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, phone, email, address } = req.body;
    
    const updatedData = { title, phone, email, address };
    
    const updatedContactcard = await Contactcard.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Contactcard updated succcessfully", updatedContactcard });
  } catch (error) {
    console.error("Error updating contactcard:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteContactcard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContactcard = await Contactcard.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Contactcard deleted successfully", deletedContactcard });
  } catch (error) {
    console.error("Error deleting Contactcard:", error);
    res.status(500).json({ messae: error.messae });
  }
};

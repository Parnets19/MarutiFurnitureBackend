
const Services = require("../model/Services");
const fs = require('fs');
const path = require('path');

exports.addServices = async (req, res) => {
  try {
    const { title, paragraph } = req.body;
    let image;
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.fieldname === "image") {
          image = `${file.filename}`;
        }
      });
    }
    const services = new Services({ image, title, paragraph });
    await services.save();
    res.status(201).json({ 
      message: "Services added successfully",
      service: services 
    });
  } catch (error) {
    console.error("Error adding services:", error);
    
    // Clean up uploaded files if error occurs
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const filePath = path.join('public/services', file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }
    
    res.status(500).json({ message: error.message });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Services.find().sort({ createdAt: -1 }); // Fixed typo: creaditedAt to createdAt
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateServices = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, paragraph } = req.body;
    
    // Find existing service to handle image cleanup if needed
    const existingService = await Services.findById(id);
    if (!existingService) {
      return res.status(404).json({ message: "Service not found" });
    }

    let image = existingService.image;
    if (req.files && req.files.length > 0) {
      // Delete old image if exists
      if (existingService.image) {
        const oldImagePath = path.join('public/services', existingService.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      req.files.forEach((file) => {
        if (file.fieldname === "image") {
          image = `${file.filename}`;
        }
      });
    }
    
    const updatedData = { title, paragraph, image };
    const updatedServices = await Services.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    
    res.status(200).json({ 
      message: "Services updated successfully", 
      updatedServices 
    });
  } catch (error) {
    console.error("Error updating services:", error);
    
    // Clean up uploaded files if error occurs
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const filePath = path.join('public/services', file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }
    
    res.status(500).json({ message: error.message });
  }
};

exports.deleteServices = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedServices = await Services.findByIdAndDelete(id);
    
    if (!deletedServices) {
      return res.status(404).json({ message: "Service not found" });
    }
    
    // Delete associated image file
    if (deletedServices.image) {
      const imagePath = path.join('public/services', deletedServices.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    res.status(200).json({ 
      message: "Services deleted successfully", 
      deletedServices 
    });
  } catch (error) {
    console.error("Error deleting services:", error);
    res.status(500).json({ message: error.message }); // Fixed typo: messae to message
  }
};

// New function to add multiple services at once
exports.addMultipleServices = async (req, res) => {
  try {
    const servicesData = req.body.services; // Array of service objects
    
    if (!Array.isArray(servicesData) || servicesData.length === 0) {
      return res.status(400).json({ message: "Services array is required" });
    }

    const results = [];
    
    for (const serviceData of servicesData) {
      const { title, paragraph } = serviceData;
      
      // Check if service already exists
      const existingService = await Services.findOne({ title });
      if (existingService) {
        results.push({
          title,
          status: 'skipped',
          message: 'Service already exists'
        });
        continue;
      }
      
      const services = new Services({ title, paragraph });
      await services.save();
      results.push({
        title,
        status: 'added',
        service: services
      });
    }
    
    res.status(201).json({ 
      message: "Services processing completed",
      results 
    });
  } catch (error) {
    console.error("Error adding multiple services:", error);
    res.status(500).json({ message: error.message });
  }
};

// New function to get service by ID
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Services.findById(id);
    
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    
    res.status(200).json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: error.message });
  }
};
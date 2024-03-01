const Property = require("../models/propertySchema");

// Controller to create a new property
const createProperty = async (req, res) => {
  try {
    const newProperty = new Property({
      location: req.body.location,
      images: req.files.map((file) => file.filename),
      description: req.body.description,
      price: req.body.price,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      user_id: req.body.user_id,
    });
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Retrieve a specific property by ID
const getPropertyById = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;

    // Retrieve the property document by ID
    const property = await Property.findById(propertyId);

    // Check if property exists
    if (!property) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    res.status(200).json({ message: "Property found", property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get properties by location
const getPropertiesByLocation = async (req, res) => {
  try {
    const location = req.params.location;

    // Search for properties by location
    const properties = await Property.find({ location });

    // Check if properties exist
    if (!properties || properties.length === 0) {
      res
        .status(404)
        .json({ message: "No properties found for this location" });
      return;
    }

    res.status(200).json({ message: "Properties found", properties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a specific property by ID
const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const updates = {
      location: req.body.location,
      images: req.files.map((file) => file.filename),
      description: req.body.description,
      price: req.body.price,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      user_id: req.body.user_id,
    };

    // Update the property document with the new information
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      updates,
      {
        new: true,
      }
    );

    // Check if property exists
    if (!updatedProperty) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Updated Property", property: updatedProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a specific property by ID
const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;

    // Delete the property document
    const deletedProperty = await Property.findByIdAndDelete(propertyId);

    // Check if property exists
    if (!deletedProperty) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Deleted Property", property: deletedProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    // Search for all properties
    const properties = await Property.find();

    // Check if properties exist
    if (!properties || properties.length === 0) {
      res.status(404).json({ message: "No properties found" });
      return;
    }

    res.status(200).json({ message: "All properties", properties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get properties by price range
const getPropertiesByPriceRange = async (req, res) => {
  try {
    const minPrice = req.params.minPrice;
    const maxPrice = req.params.maxPrice;

    // Search for properties within the price range
    const properties = await Property.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    // Check if properties exist
    if (!properties || properties.length === 0) {
      res
        .status(404)
        .json({ message: "No properties found within the price range" });
      return;
    }

    res
      .status(200)
      .json({ message: "Properties found within the price range", properties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Retrieve properties by user ID
const getPropertiesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const properties = await Property.find({ user_id: userId });
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createProperty,
  updateProperty,
  getPropertyById,
  deleteProperty,
  getPropertiesByLocation,
  getAllProperties,
  getPropertiesByUserId,
  getPropertiesByPriceRange,
};

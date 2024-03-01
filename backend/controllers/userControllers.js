const User = require("../models/userSchema");

// controller to get all the users
const getUsers = async (req, res) => {
  try {
    // Retrieve all user documents
    const users = await User.find();

    res.status(200).json({ message: "Users found", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to Get a single User
const getUserById = async (req, res) => {
  console.log("Getting user by Id");
  try {
    const userId = req.params.userId;

    // Retrieve the user document by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to create a new user
const createUser = async (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "Bad Request" });
    throw new Error((message = "Bad Request"));
  }

  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    avatar_image: req.body.avatar_image,
  });
  res.status(200).json({ message: "Created New User", user });
};

// Controller to update a user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      avatar_image: req.body.avatar_image,
    };

    // Update the user document with the new information
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    // Check if user exists
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Updated User", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// controller to delete a User
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the user document
    const deletedUser = await User.findByIdAndDelete(userId);

    // Check if user exists
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Deleted User", user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
};

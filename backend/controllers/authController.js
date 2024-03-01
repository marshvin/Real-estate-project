const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Controller For Authenticating Existing Users
const loginController = async (req, res) => {
  const { username, password } = req.body;
  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ msg: "Username not found" });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ msg: "Invalid credentials: Incorrect Password" });
  }

  // Create JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  res.json({ token, user_id: user._id });
};

// Controller For Registering New Users
const signUpController = async (req, res) => {
  const {
    username,
    password,
    email,
    first_name,
    last_name,
    avatar_image,
    role,
  } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({
    $or: [{ email: username }, { username: username }],
  });
  if (userExists) {
    return res.status(400).json({ msg: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user object
  const user = new User({
    username,
    email,
    first_name,
    last_name,
    role,
    password: hashedPassword,
  });
  // If file is uploaded, save file information to user object
  if (req.file) {
    user.avatar_image = req.file.filename;
  }
  // Save user to database
  try {
    await user.save();
    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { loginController, signUpController };

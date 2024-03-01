// import the jsonwebtoken package to handle JWT tokens
const jwt = require("jsonwebtoken");

// Define a middleware function to protect routes
const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("x-auth-token");

  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the decoded user information to the request object
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = { authMiddleware };

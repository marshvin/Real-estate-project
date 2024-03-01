// Import libs
const express = require("express");
// Function for connecting to database
// const { dbConn } = require("./config");
// Cross Origin Requests
const cors = require("cors");
// Importing routes
const { router } = require("./routes/routes");
// Connect to database
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// Initalizing the app
const app = express();

//Middleware for form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enabling CORS
app.use(cors());

// Execute router from ../routes
app.use(router);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  }
};

const startServer = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
};

const initApp = async () => {
  await connectToDatabase();
  startServer();
};

initApp();

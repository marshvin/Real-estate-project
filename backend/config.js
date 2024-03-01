const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const dbConn = () => {
  // MongoDB connection
  mongoose.connect(process.env.MONGO_URI).then(
    (response) => console.log("Connected to DB"),
    (err) => console.log("Some error", err)
  );
};

module.exports = { dbConn };

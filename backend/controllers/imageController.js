const path = require("path");
const fs = require("fs");

const imageController = async (req, res) => {
  try {
    // res.sendFile(path.join(__dirname, "../uploads", req.params.filename));

    const filePath = path.join(__dirname, "../uploads", req.params.filename);
    console.log(filePath);
    await fs.promises.access(filePath);
    res.sendFile(filePath);
  } catch (error) {
    res.status(404).json({ message: "Image not found" });
  }
};

module.exports = { imageController };

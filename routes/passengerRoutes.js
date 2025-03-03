const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Passenger = require("../models/Passenger");
const fs = require("fs");
require("dotenv").config();

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImageToCloudinary(imagePath, publicId) {

  try {
    const uploadResult = await cloudinary.uploader.upload(imagePath, {
      public_id: publicId,
    });
    console.log("cloudinary", uploadResult);
    console.log("✅ Image uploaded:", uploadResult.url);
    return uploadResult.url;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);
    return null;
  }
}


// Define Upload Directory
const uploadDir = "./uploads";

// Multer Configuration (Temporary File Storage)
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// // Function to Upload File to Cloudinary
const uploadFileToCloudinary = async (filePath) => {
  try {
    const result = await uploadToCloudinary(filePath);
    fs.unlinkSync(filePath); // Remove file after upload
    return result.secure_url; // Return Cloudinary URL
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);
    return null;
  }
};

// Add Passenger API with Cloudinary Upload
router.post(
  "/add",
  upload.fields([{ name: "photo" }, { name: "idCard" }]),
  async (req, res) => {
    try {
      const { name, age, gender, contact, email } = req.body;

      // Upload files to Cloudinary
      console.log(req.files);
      const photoPath = req.files["photo"] ? req.files["photo"][0].path : null;
      const idCardPath = req.files["idCard"] ? req.files["idCard"][0].path : null;

      console.log(photoPath, idCardPath)
      const photo = photoPath ? await uploadImageToCloudinary(photoPath, 'photo') : null;
      const idCard = idCardPath ? await uploadFileToCloudinary(idCardPath) : null;

      console.log(photo, idCard);
      // Create new Passenger entry
      const newPassenger = new Passenger({
        name,
        age,
        gender,
        contact,
        email,
        photo,
        idCard,
      });

      await newPassenger.save();

      res.status(201).json({
        message: "✅ Passenger added successfully!",
        passenger: newPassenger,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

// Get All Passengers API
router.get("/", async (req, res) => {
  try {
    let data = await Passenger.find({});
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;




const express = require("express");
const connectDB = require("./config/db");
const passengerRoutes = require("./routes/passengerRoutes");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api", passengerRoutes);

// Connect to MongoDB
connectDB();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to Upload Image to Cloudinary
// async function uploadImageToCloudinary(imagePath, publicId) {
//   try {
//     const uploadResult = await cloudinary.uploader.upload(imagePath, {
//       public_id: publicId,
//     });
//     console.log("✅ Image uploaded:", uploadResult.url);
//     return uploadResult.url;
//   } catch (error) {
//     console.error("❌ Cloudinary Upload Error:", error);
//     return null;
//   }
// }

// Test Image Upload (Comment this in Production)
// (async function () {
//   const testImageUrl = await uploadImageToCloudinary(
//     "https://static.vecteezy.com/system/resources/previews/020/765/399/original/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg", // Replace with a real image URL
//     "test_upload"
//   );
//   console.log("Test Image URL:", testImageUrl);
// })();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


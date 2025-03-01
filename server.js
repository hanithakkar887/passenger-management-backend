// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const passengerRoutes = require("./routes/passengerRoutes");

// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads")); // Serve uploaded files
// app.use("/passengers", passengerRoutes);

// // Connect to Database
// connectDB();

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const connectDB = require("./config/db");
const passengerRoutes = require("./routes/passengerRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve uploaded files
app.use("/api", passengerRoutes);

// Connect to MongoDB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

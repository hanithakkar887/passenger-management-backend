// const express = require("express");
// const multer = require("multer");
// const Passenger = require("../models/Passenger");
// const router = express.Router();

// // Multer storage configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // Store files in the uploads folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname); // Unique file name
//     },
// });

// // File upload middleware
// const upload = multer({ storage: storage });

// // @route   POST /passengers
// // @desc    Add multiple passengers
// router.post("/", upload.fields([{ name: "photo" }, { name: "idCard" }]), async (req, res) => {
//     try {
//         const passengersData = req.body.passengers ? JSON.parse(req.body.passengers) : [];
//         const savedPassengers = [];

//         for (const passenger of passengersData) {
//             const newPassenger = new Passenger({
//                 ...passenger,
//                 photo: req.files["photo"] ? req.files["photo"][0].path : null,
//                 idCard: req.files["idCard"] ? req.files["idCard"][0].path : null,
//             });

//             await newPassenger.save();
//             savedPassengers.push(newPassenger);
//         }

//         res.status(201).json({ message: "Passengers added successfully", passengers: savedPassengers });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// // @route   GET /passengers
// // @desc    Get all passengers
// router.get("/", async (req, res) => {
//     try {
//         const passengers = await Passenger.find();
//         res.status(200).json(passengers);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// module.exports = router;
const express = require("express");
const multer = require("multer");
const Passenger = require("../models/Passenger");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Add Passenger
router.post(
  "/add",
  upload.fields([{ name: "photo" }, { name: "idCard" }]),
  async (req, res) => {
    try {
      const { name, age, gender, contact, email } = req.body;
      const photo = req.files["photo"] ? req.files["photo"][0].path : null;
      const idCard = req.files["idCard"] ? req.files["idCard"][0].path : null;

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
        message: "Passenger added successfully!",
        passenger: newPassenger,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get("/", async (req, res) => {
    try{
    let data = await Passenger.find({});
    res.status(200).json({
        data
    })
}catch(err){
    res.status(500).json({err});
}
});
module.exports = router;

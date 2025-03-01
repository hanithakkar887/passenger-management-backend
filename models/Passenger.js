// const mongoose = require("mongoose");

// const passengerSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     age: { type: Number, required: true },
//     gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
//     contact: { type: String },
//     email: { type: String },
//     photo: { type: String }, // File path for photo
//     idCard: { type: String }, // File path for ID card
// });

// module.exports = mongoose.model("Passenger", passengerSchema);


// const mongoose = require("mongoose");

// const passengerSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     gender: String,
//     contact: String,
//     email: String,
//     photo: String,   // Store file path of image
//     idCard: String,  // Store file path of PDF
// });

// module.exports = mongoose.model("Passenger", passengerSchema);
const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 1,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    contact: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Invalid phone number"], // Ensures it's a 10-digit number
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Invalid email format"],
    },
    photo: {
        type: String, // File path of image
        default: "",
    },
    idCard: {
        type: String, // File path of PDF
        default: "",
    },
}, { timestamps: true }); // Adds createdAt & updatedAt

module.exports = mongoose.model("Passenger", passengerSchema);

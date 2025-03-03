
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

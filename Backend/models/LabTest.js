const mongoose = require("mongoose");

const labTestSchema = new mongoose.Schema(
    {
        testName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        department: {
            type: String,
            enum: ["Lab", "Diagnostic"],
            default: "Lab"
        },

        category: {
            type: String,
            default: "",
            trim: true
        },

        price: {
            type: Number,
            required: true,
            default: 0
        },

        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "LabTest",
    labTestSchema
);
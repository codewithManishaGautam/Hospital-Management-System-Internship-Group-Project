const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    role: {
        type: String,
        enum: ["admin","doctor","receptionist","nurse","lab","pharmacy"]
    }
});

module.exports = mongoose.model("User", userSchema);
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Import Models
const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");

// Import Routes
const insuranceRoutes = require("./routes/insurance/index");
const authRoutes = require("./routes/authRoutes");

// MongoDB Connect and server startup
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect MongoDB:", err);
    process.exit(1);
  }
};

// ---------------- ROUTES ----------------

// Add Patient
app.post("/addPatient", async (req, res, next) => {
  try {
    const data = await Patient.create(req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Get Patients (with optional search)
app.get("/patients", async (req, res, next) => {
  try {
    const { search } = req.query;
    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};
    const data = await Patient.find(query).limit(20);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Delete Patient
app.delete("/patients/:id", async (req, res, next) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

const errorHandler = require('./middleware/errorHandler');

// Mount modular routes
app.use("/api/auth", authRoutes);
app.use("/api/insurance", insuranceRoutes);

// Global error handler
app.use(errorHandler);

startServer();

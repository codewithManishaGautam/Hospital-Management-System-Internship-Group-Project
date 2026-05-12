const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const insuranceRoutes = require("./routes/insurance/index");

// MongoDB Connect and server startup
const startServer = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/hospitalDB");
    console.log("MongoDB Connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (err) {
    console.error("Failed to connect MongoDB:", err);
    process.exit(1);
  }
};

// ---------------- SCHEMAS ----------------
const Patient = mongoose.model("Patient", {
  name: String,
  age: Number,
  mobile: String,
  address: String,
  adhaar: String,
});

const Doctor = mongoose.model("Doctor", {
  name: String,
  specialization: String,
  mobile: String,
});

const Appointment = mongoose.model("Appointment", {
  patientId: String,
  doctorId: String,
  date: String,
  status: { type: String, default: "pending" },
});

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

// Get Patients
app.get("/patients", async (req, res, next) => {
  try {
    const data = await Patient.find();
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

// Mount modular routes
app.use("/api/insurance", insuranceRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

startServer();
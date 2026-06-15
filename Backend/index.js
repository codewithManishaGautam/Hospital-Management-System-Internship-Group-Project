const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hospital Management Backend Running");
});

const PORT = 5000;

const patientRoutes = require("./routes/patientRoutes");
app.use("/api/patient", patientRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

// Doctor routes
const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api", doctorRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


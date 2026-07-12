const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://HMS_2026_internship:HMS_internship@hospitaldb.0jrif0e.mongodb.net/hms"
  )
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "HospitalDB",
    });

    console.log("MongoDB Connected");
    console.log("Database:", mongoose.connection.name);
  } catch (error) {
    console.log("Database Connection Error:");
    console.log(error);
  }
};

module.exports = connectDB;
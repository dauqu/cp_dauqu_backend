require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log(
      "CP_Dauqu_Backend Database Connected Successfuly----------------------"
    );
  } catch (error) {
    console.log("(CP_Dauqu_Backend Connection error) ", error);
  }
};
module.exports = connectDB;

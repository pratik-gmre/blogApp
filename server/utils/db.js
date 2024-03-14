const mongoose = require("mongoose");

const URL = process.env.MONGO_CON;

const connectTOMongo = async () => {
  try {
    await mongoose.connect(URL);
    console.log("connected to database");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectTOMongo;

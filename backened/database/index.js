const mongoose = require("mongoose");

const { MONGOOSE_CONNECTION_STRING } = require("../config/index"); // destructure to use here

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGOOSE_CONNECTION_STRING);
    console.log(`Database connnnected to host: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

module.exports = dbConnect;

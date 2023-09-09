const mongoose = require("mongoose");

const { MONGOOSE_CONNECTION_STRING } = require("../config/index");

// const connetionString =
// "mongodb+srv://asim23663:PrwKzDRC2iHqqtJq@cluster0.cwwwnb1.mongodb.net/coinn-bounnce?retryWrites=true&w=majority";
//   "mongodb+srv://asim23663:<password>@cluster0.cwwwnb1.mongodb.net/DB name?retryWrites=true&w=majority";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGOOSE_CONNECTION_STRING);
    console.log(`Database connnnected to host: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

module.exports = dbConnect;

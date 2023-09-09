// all imports hould be there

const dotennv = require("dotenv").config();
const PORT = process.env.PORT;
const MONGOOSE_CONNECTION_STRING = process.env.MONGOOSE_CONNECTION_STRING;

module.exports = {
  PORT,
  MONGOOSE_CONNECTION_STRING,
};

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.mongoURL);

const connection = mongoose.connection;

module.exports = {
  connection,
};

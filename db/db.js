const mongoose = require("mongoose");
require("dotenv").config();
let url = process.env.MONGOURL;
const connection = mongoose.connect(url);
module.exports = {
  connection,
};

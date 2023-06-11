const mongoose = require("mongoose");

//schema

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("google", userSchema);

module.exports = {
  UserModel,
};

const mongoose = require("mongoose");

//schema

const postSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    category: String,
    userID: String,
    user: String,
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("notes", postSchema);

module.exports = {
  PostModel,
};

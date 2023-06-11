const express = require("express");
const noteRouter = express();
const { PostModel } = require("../model/note.model");
const { auth } = require("../middleware/auth.middleware");
noteRouter.use(auth);
noteRouter.post("/create", async (req, res) => {
  try {
    let newUser = new PostModel(req.body);
    await newUser.save();
    res.status(200).json({ msg: "Post has been added " });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

noteRouter.get("/", async (req, res) => {
  try {
    let gotUser = await PostModel.findOne({ userID: req.body.userID });
    await gotUser.save();
    res.status(200).json({ msg: "got the user", gotUser });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  let userDocId = req.body.userID;
  try {
    const { noteID } = req.params;
    let post = await PostModel.findOne({ _id: noteID });
    let postDocId = post.userID;
    if (userDocId === postDocId) {
      await PostModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.status(200).json({ msg: `the new note has been updated` });
    } else {
      res.status(400).json({ msg: "Not Updated" });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

noteRouter.delete("/delete/:noteID", async (req, res) => {
  let userDocId = req.body.userID;
  try {
    const { noteID } = req.params;
    let post = await PostModel.findOne({ _id: noteID });
    let postDocId = post.userID;
    if (userDocId === postDocId) {
      await PostModel.findByIdAndDelete({ _id: noteID });
      res.status(200).json({ msg: `the new note has been Deleted` });
    } else {
      res.status(400).json({ msg: "Not Deleted" });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

module.exports = {
  noteRouter,
};

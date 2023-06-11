const express = require("express");
const app = express();
const { connection } = require("./db/db");
const { userRouter } = require("./router/user.router");
const { noteRouter } = require("./router/note.router");
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json());
app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.listen(port, async (req, res) => {
  try {
    await connection;
    console.log("db is connected now");
    console.log(`it is running ${port}`);
  } catch (error) {
    console.log(error);
    console.log("there is something wrong with this url");
  }
});

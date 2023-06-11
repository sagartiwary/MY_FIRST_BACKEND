const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.KEY;
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (token) {
      const decoded = jwt.verify(token, key);
      if (decoded) {
        // console.log(decoded);
         req.body.userID=decoded.userID;
         req.body.user=decoded.user;
        next();
      } else {
        res.status(400).json({ msg: "authorized first!!" });
      }
    } else {
      res.status(400).json({ msg: "Please authorized!!" });
    }
  } catch (error) {
    res.status(400).json({ err: error.messsage });
  }
};

module.exports = {
  auth,
};

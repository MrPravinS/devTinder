const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/interested/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;  // from userId
      const toUserID = req.params.toUserId;
      const status = req.params.toUserId;
      
    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }

    res.send(user.firstName + " Send Connection request");
  }
);

module.exports = requestRouter;

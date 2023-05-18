const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const generateToken = require("../config/jwtToken");

const sendMessages = asyncHandler(async (req, res) => {
  const { myMessage } = req.body;
  if (!myMessage) {
    res.status(400);
    throw new Error("Please enter message!");
  }

  const user = await Message.create({
    myMessage,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      myMessage: user.myMessage,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the message!");
  }
});

const getMessages = asyncHandler(async (req, res) => {
  Message.find()
    .then((result) => {
      res.status(200).json({
        msg: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = { sendMessages, getMessages };

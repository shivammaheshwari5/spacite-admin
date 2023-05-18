const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    myMessage: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageModel);
module.exports = Message;

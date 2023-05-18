const mongoose = require("mongoose");

const titleModel = mongoose.Schema(
  {
    title: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Title = mongoose.model("Title", titleModel);
module.exports = Title;

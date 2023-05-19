const mongoose = require("mongoose");

const imageModel = mongoose.Schema(
  {
    name: String,
    real_name: String,
    category: String,
    size: Number,
    height: Number,
    width: Number,
    title: String,
    title1: String,
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", imageModel);
module.exports = Image;

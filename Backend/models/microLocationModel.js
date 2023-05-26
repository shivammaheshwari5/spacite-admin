const mongoose = require("mongoose");

const microLocationModel = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const MicroLocation = mongoose.model("MicroLocation", microLocationModel);
module.exports = MicroLocation;

const mongoose = require("mongoose");

const stateModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
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

const State = mongoose.model("State", stateModel);
module.exports = State;

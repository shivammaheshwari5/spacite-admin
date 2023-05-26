const mongoose = require("mongoose");

const stateModel = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
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

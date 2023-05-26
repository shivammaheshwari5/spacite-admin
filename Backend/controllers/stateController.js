const asyncHandler = require("express-async-handler");
const State = require("../models/stateModel");

const getState = asyncHandler(async (req, res) => {
  State.find({})
    .populate("country", "name")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
const postState = asyncHandler(async (req, res) => {
  const { name, description, country } = req.body;
  try {
    const statesData = await State.create({ name, description, country });
    res.json(statesData);
  } catch (error) {
    console.log(error);
  }
});
const addOrEditState = asyncHandler(async (req, res) => {});
const deleteState = asyncHandler(async (req, res) => {
  const { stateId } = req.params;
  await State.findByIdAndDelete(stateId)
    .then(() => {
      res.send("delete successfully");
    })
    .catch((err) => {
      res.send({
        error: err,
      });
    });
});

module.exports = { getState, postState, addOrEditState, deleteState };

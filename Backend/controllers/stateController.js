const asyncHandler = require("express-async-handler");
const State = require("../models/stateModel");

const getState = asyncHandler(async (req, res) => {});
const postState = asyncHandler(async (req, res) => {
  const { name, country, description } = req.body;

  const state = await State.create({
    name,
    country,
    description,
  });
  if (state) {
    res.status(201).json({
      _id: state._id,
      name: state.name,
      description: state.description,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the country!");
  }
});
const addOrEditState = asyncHandler(async (req, res) => {});
const deleteState = asyncHandler(async (req, res) => {});

module.exports = { getState, postState, addOrEditState, deleteState };

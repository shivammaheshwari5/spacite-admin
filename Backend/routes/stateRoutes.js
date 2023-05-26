const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getState,
  postState,
  addOrEditState,
  deleteState,
} = require("../controllers/stateController");
const router = express.Router();

router
  .get("/states", protect, getState)
  .post("/states", protect, postState)
  .put("/states/:stateId", addOrEditState)
  .delete("/delete/:stateId", protect, deleteState);

module.exports = router;

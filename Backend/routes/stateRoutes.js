const express = require("express");
// const { protect } = require("../middleware/authMiddleware");
const {
  getState,
  postState,
  addOrEditState,
  deleteState,
} = require("../controllers/stateController");
const router = express.Router();

router
  .get("/states", getState)
  .post("/states", postState)
  .put("/states/:stateId", addOrEditState)
  .delete("/delete/:stateId", deleteState);

module.exports = router;

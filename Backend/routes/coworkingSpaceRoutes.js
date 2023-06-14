const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getWorkSpaces,
  postWorkSpaces,
  editWorkSpaces,
  deleteWorkSpaces,
  getWorkSpacesById,
  searchWorkSpacesByName,
} = require("../controllers/coworkingSpaceController");
const router = express.Router();

router
  .get("/workSpaces", protect, getWorkSpaces)
  .get("/workspaces/search", searchWorkSpacesByName)
  .get("/workSpaces/:workSpaceId", protect, getWorkSpacesById)
  .post("/workSpaces", protect, postWorkSpaces)
  .put("/workSpaces/:workSpaceId", protect, editWorkSpaces)
  .delete("/delete/:workSpaceId", protect, deleteWorkSpaces);

module.exports = router;

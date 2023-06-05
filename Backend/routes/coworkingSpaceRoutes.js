const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getWorkSpaces,
  postWorkSpaces,
  editWorkSpaces,
  deleteWorkSpaces,
} = require("../controllers/coworkingSpaceController");
const router = express.Router();

router
  .get("/workSpaces", protect, getWorkSpaces)
  .post("/workSpaces", protect, postWorkSpaces)
  .put("/workSpaces/:workSpaceId", protect, editWorkSpaces)
  .delete("/delete/:workSpacesId", protect, deleteWorkSpaces);

module.exports = router;

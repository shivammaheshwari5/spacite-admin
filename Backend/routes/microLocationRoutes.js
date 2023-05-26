const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getMicroLocation,
  postMicroLocation,
  deleteMicroLocation,
} = require("../controllers/microlocationController");
const router = express.Router();

router
  .get("/microlocations", protect, getMicroLocation)
  .post("/microlocations", protect, postMicroLocation)
  .delete("/delete/:microlocationId", protect, deleteMicroLocation);

module.exports = router;

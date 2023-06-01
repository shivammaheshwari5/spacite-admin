const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getCity,
  postCity,
  deleteCity,
  getCityByState,
} = require("../controllers/manageCity");
const router = express.Router();

router
  .get("/cities", getCity)
  .post("/cities", protect, postCity)
  .delete("/delete/:cityId", protect, deleteCity)
  .post("/citybystate", protect, getCityByState);

module.exports = router;

const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getCity, postCity, deleteCity } = require("../controllers/manageCity");
const router = express.Router();

router
  .get("/cities", protect, getCity)
  .post("/cities", protect, postCity)
  .delete("/delete/:cityId", protect, deleteCity);

module.exports = router;

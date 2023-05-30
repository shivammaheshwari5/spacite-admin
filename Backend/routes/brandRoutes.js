const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getBrand,
  postBrand,
  addOrEditBrand,
  deleteBrand,
} = require("../controllers/brandController");
const router = express.Router();

router
  .get("/brands", protect, getBrand)
  .post("/brands", protect, postBrand)
  .put("/brands/:brandId", protect, addOrEditBrand)
  .delete("/delete/:brandId", protect, deleteBrand);

module.exports = router;

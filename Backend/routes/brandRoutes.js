const express = require("express");
// const { protect } = require("../middleware/authMiddleware");
const {
  getBrand,
  postBrand,
  addOrEditBrand,
  deleteBrand,
  getBrandById,
} = require("../controllers/brandController");
const router = express.Router();

router
  .get("/brands", getBrand)
  .get("/brands/:brandId", getBrandById)
  .post("/brands", postBrand)
  .put("/brands/:brandId", addOrEditBrand)
  .delete("/delete/:brandId", deleteBrand);

module.exports = router;

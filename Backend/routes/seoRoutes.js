const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getSeo,
  postSeo,
  addOrEditSeo,
  deleteSeo,
} = require("../controllers/seoController");
const router = express.Router();

router
  .get("/seos", protect, getSeo)
  .post("/seos", protect, postSeo)
  .put("/seos/:seoId", addOrEditSeo)
  .delete("/delete/:seoId", protect, deleteSeo);

module.exports = router;

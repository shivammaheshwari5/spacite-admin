const express = require("express");
// const { protect } = require("../middleware/authMiddleware");
const {
  getSeo,
  postSeo,
  addOrEditSeo,
  deleteSeo,
  getSeoById,
} = require("../controllers/seoController");
const router = express.Router();

router
  .get("/seos", getSeo)
  .get("/seos/:seoId", getSeoById)
  .post("/seos", postSeo)
  .put("/seos/:seoId", addOrEditSeo)
  .delete("/delete/:seoId", deleteSeo);

module.exports = router;

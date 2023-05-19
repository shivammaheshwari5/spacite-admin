const express = require("express");
// const { protect } = require("../middleware/authMiddleware");
const {
  getCountries,
  postCountry,
  addOrEditCountry,
  getCountryById,
  toggleCountryStatus,
  deleteCountry,
} = require("../controllers/manageCountry");
const router = express.Router();

router
  .get("/countries", getCountries)
  .post("/country", postCountry)
  .put("/country/:countryId", addOrEditCountry)
  .get("/country/:id", getCountryById)
  .get("/country/changeStatus/:countryId", toggleCountryStatus)
  .delete("/delete/:countryId", deleteCountry);

module.exports = router;

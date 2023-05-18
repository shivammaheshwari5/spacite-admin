const express = require("express");

// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/title").post(builderTitle);

module.exports = router;

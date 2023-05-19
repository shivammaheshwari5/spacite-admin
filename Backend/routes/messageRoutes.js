const express = require("express");
const { sendMessages } = require("../controllers/messageController");
const { getMessages } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(sendMessages);
router.route("/").get(protect, getMessages);

module.exports = router;

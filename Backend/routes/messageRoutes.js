const express = require("express");
const { sendMessages } = require("../controllers/messageController");
const { getMessages } = require("../controllers/messageController");
const router = express.Router();

router.route("/").post(sendMessages);
router.route("/").get(getMessages);

module.exports = router;

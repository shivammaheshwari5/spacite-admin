const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, registerUser).get(protect, allUsers);
router.route("/login").post(authUser);

module.exports = router;

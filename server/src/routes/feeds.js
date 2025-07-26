const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feedController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/feed", authMiddleware, feedController.getFeed);
router.get("/liked", authMiddleware, feedController.getLikedArticles);
router.get("/bookmarked", authMiddleware, feedController.getBookmarkedArticles);

module.exports = router;

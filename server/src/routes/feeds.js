const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feedController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, feedController.getFeed);
router.get("/liked", authMiddleware, feedController.getLikedArticles);
router.get("/bookmarked", authMiddleware, feedController.getBookmarkedArticles);

module.exports = router;

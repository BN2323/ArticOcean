const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmarkController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/:articleId", authMiddleware, bookmarkController.bookmarkArticle);
router.delete("/:articleId", authMiddleware, bookmarkController.unbookmarkArticle);

module.exports = router;
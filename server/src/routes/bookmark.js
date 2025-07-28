const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmarkController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/:articleId/bookmark", authMiddleware, bookmarkController.bookmarkArticle);
router.delete("/:articleId/bookmark", authMiddleware, bookmarkController.unbookmarkArticle);

module.exports = router;
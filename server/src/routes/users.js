const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const likeController = require("../controllers/likeController");
const bookmarkController = require("../controllers/bookmarkController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, articleController.createArticle);
router.get("/:id", articleController.getArticle);
router.put("/:id", authMiddleware, articleController.updateArticle);
router.delete("/:id", authMiddleware, articleController.deleteArticle);

router.post("/:articleId/like", authMiddleware, likeController.likeArticle);
router.delete("/:articleId/like", authMiddleware, likeController.unlikeArticle);

router.post("/:articleId/bookmark", authMiddleware, bookmarkController.bookmarkArticle);
router.delete("/:articleId/bookmark", authMiddleware, bookmarkController.unbookmarkArticle);

module.exports = router;

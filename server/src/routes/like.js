const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const likeController = require("../controllers/likeController");

router.post("/:articleId", authMiddleware, likeController.likeArticle);
router.delete("/:articleId", authMiddleware, likeController.unlikeArticle);

module.exports = router;
const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, articleController.createArticle);
router.get("/:id", articleController.getArticle);
router.put("/:id", authMiddleware, articleController.updateArticle);
router.delete("/:id", authMiddleware, articleController.deleteArticle);


module.exports = router;

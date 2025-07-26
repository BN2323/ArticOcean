const { Article, User, Like, Bookmark } = require("../models");

exports.createArticle = async (req, res) => {
  try {
    const { title, content, thumbnail } = req.body;
    const article = await Article.create({ title, content, thumbnail, authorId: req.user.id });
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: "Error creating article", error });
  }
};

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [{ model: User, as: "author", attributes: ["id", "username", "name", "avatar"] }]
    });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error fetching article", error });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    if (article.authorId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    const { title, content, thumbnail } = req.body;
    await article.update({ title, content, thumbnail });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error updating article", error });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    if (article.authorId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    await article.destroy();
    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting article", error });
  }
};

exports.getArticlesByUser = async (req, res) => {
  try {
    const articles = await Article.findAll({
      where: { authorId: req.params.userId },
      include: [{ model: User, as: "author", attributes: ["id", "username", "name", "avatar"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error });
  }
};


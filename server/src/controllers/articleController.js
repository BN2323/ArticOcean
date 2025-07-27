const { Article, User, Like, Bookmark , Comment} = require("../models");
const generateExcerpt = require("../utils/generateExcerpt");

exports.createArticle = async (req, res) => {
  try {
    const { title, content, thumbnail } = req.body;
    const excerpt = generateExcerpt(content); // Generate excerpt from content
    const article = await Article.create({ title, excerpt, content, thumbnail, authorId: req.user.id });
    console.log("Article created:", article.toJSON());
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: "Error creating article", error });
  }
};

exports.getArticle = async (req, res) => {
  console.log('body' , req.body);
  try {
    console.log("Fetching article with ID:", req.params.id);
    console.log("Current user ID:", req.user?.id);
    const article = await Article.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          as: "comments", // must match the association alias
          include: [
            {
              model: User,
              as: "commenter", // must match the alias
              attributes: ["id", "username", "avatar"],
            },
          ],
          order: [["createdAt", "ASC"]],
        },
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "name", "avatar"],
        },
        {
          model: User,
          as: "likers", // users who liked
          required: false,
          // attributes: [],
          through: {
            attributes: ["id"],
          },
        },
        {
          model: User,
          as: "bookmarkers", // users who bookmarked
          required: false,
          // attributes: [],
          through: {
            attributes: ["id"],
          },
        },
      ],
    });

    console.log("Article fetched:", article ? article.toJSON() : "Not found");

    if (!article) return res.status(404).json({ message: "Article not found" });

    const articleJSON = article.toJSON();

    // Count total likes and bookmarks
    articleJSON.likeCount = articleJSON.likers ? articleJSON.likers.length : 0;
    articleJSON.bookmarkCount = articleJSON.bookmarkers ? articleJSON.bookmarkers.length : 0;

    // Check if current user liked or bookmarked
    articleJSON.isLiked = articleJSON.likers && articleJSON.likers.some(user => user.id === req.user.id);
    articleJSON.isBookmarked = articleJSON.bookmarkers && articleJSON.bookmarkers.some(user => user.id === req.user.id);

    // Remove user arrays to keep response clean
    delete articleJSON.likers;
    delete articleJSON.bookmarkers;

    res.json(articleJSON);
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


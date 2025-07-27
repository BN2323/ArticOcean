const { Comment, Article, User } = require('../models');

exports.addComment = async (req, res) => {
  try {
    const articleId = req.params.id;
    const userId = req.user.id;
    const { content } = req.body;

    const article = await Article.findByPk(articleId);
    if (!article) return res.status(404).json({ message: "Article not found" });

    const comment = await Comment.create({
      articleId,
      userId,
      content,
    });

    const fullComment = await Comment.findByPk(comment.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'username', 'avatar'] }],
    });

    res.status(201).json(fullComment);
  } catch (err) {
    res.status(500).json({ message: "Error adding comment", error: err });
  }
};

exports.getComments = async (req, res) => {
  try {
    const articleId = req.params.id;
    const comments = await Comment.findAll({
      where: { articleId },
      include: [{ model: User, as: 'author', attributes: ['id', 'username', 'avatar'] }],
      order: [['createdAt', 'ASC']],
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err });
  }
};

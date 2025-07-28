const { Comment, Article, User } = require('../models');

exports.addComment = async (req, res) => {
  try {
    const articleId = req.params.articleId;
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
      include: [{ model: User, as: 'commenter', attributes: ['id', 'username', 'avatar'] }],
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
      include: [{ model: User, as: 'commenter', attributes: ['id', 'username', 'avatar'] }],
      order: [['createdAt', 'ASC']],
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.articleId;
    const userId = req.user.id;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Optional: Only author can delete their comment
    if (comment.userId !== userId) {
      return res.status(403).json({ message: "You can only delete your own comment" });
    }

    await comment.destroy();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment", error: err });
  }
};

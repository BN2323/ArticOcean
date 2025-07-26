const { Like } = require("../models");

exports.likeArticle = async (req, res) => {
  try {
    const [like, created] = await Like.findOrCreate({
      where: { userId: req.user.id, articleId: req.params.articleId },
    });
    if (!created) {
      return res.status(400).json({ message: "Already liked" });
    }
    res.json({ message: "Article liked" });
  } catch (error) {
    res.status(500).json({ message: "Error liking article", error });
  }
};

exports.unlikeArticle = async (req, res) => {
  try {
    const like = await Like.findOne({ where: { userId: req.user.id, articleId: req.params.articleId } });
    if (!like) return res.status(404).json({ message: "Like not found" });

    await like.destroy();
    res.json({ message: "Article unliked" });
  } catch (error) {
    res.status(500).json({ message: "Error unliking article", error });
  }
};

const { Bookmark } = require("../models");

exports.bookmarkArticle = async (req, res) => {
  try {
    const [bookmark, created] = await Bookmark.findOrCreate({
      where: { userId: req.user.id, articleId: req.params.articleId },
    });
    if (!created) {
      return res.status(400).json({ message: "Already bookmarked" });
    }
    res.json({ message: "Article bookmarked" });
  } catch (error) {
    res.status(500).json({ message: "Error bookmarking article", error });
  }
};

exports.unbookmarkArticle = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({ where: { userId: req.user.id, articleId: req.params.articleId } });
    if (!bookmark) return res.status(404).json({ message: "Bookmark not found" });

    await bookmark.destroy();
    res.json({ message: "Article unbookmarked" });
  } catch (error) {
    res.status(500).json({ message: "Error unbookmarking article", error });
  }
};

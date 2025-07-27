const { Article, User, Follow, Like, Bookmark } = require("../models");
const { Op } = require("sequelize");

exports.getFeed = async (req, res) => {
  try {
    const currentUserId = req.user.id; // from auth middleware

    // Get the list of IDs the current user follows
    const following = await Follow.findAll({
      where: { followerId: currentUserId },
      attributes: ['followingId']
    });

    const followingIds = following.map(f => f.followingId);

    // Query articles from followed users
    const followedArticles = await Article.findAll({
      where: { authorId: { [Op.in]: followingIds } },
      include: [{ model: User, as: "author", attributes: ["id", "username", "name", "avatar"] }],
    });

    // Query articles from other users
    const otherArticles = await Article.findAll({
      where: { authorId: { [Op.notIn]: followingIds } },
      include: [{ model: User, as: "author", attributes: ["id", "username", "name", "avatar"] }],
    });

    res.json({ followedArticles, otherArticles });

  } catch (err) {
    res.status(500).json({ message: "Failed to load feed", error: err });
  }
};

exports.getLikedArticles = async (req, res) => {
  try {
    const likedArticles = await req.user.getLikedArticles({
      include: [{ model: User, as: "author", attributes: ["id", "username", "name", "avatar"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json({ liked: likedArticles });
  } catch (err) {
    res.status(500).json({ message: "Failed to load liked articles", error: err });
  }
};

exports.getBookmarkedArticles = async (req, res) => {
  try {
    const bookmarked = await req.user.getBookmarkedArticles({
      include: [{ model: User, as: "author", attributes: ["id", "username", "name", "avatar"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json({ bookmarked });
  } catch (err) {
    res.status(500).json({ message: "Failed to load bookmarked articles", error: err });
  }
};

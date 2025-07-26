const { Article, User, Follow, Like, Bookmark } = require("../models");
const { Op } = require("sequelize");

exports.getFeed = async (req, res) => {
  try {
    const currentUser = req.user;

    // 1. Get IDs of followed users
    const followings = await currentUser.getFollowing({ attributes: ["id"] });
    const followingIds = followings.map(user => user.id);

    // 2. Get articles from followed users
    const followedArticles = await Article.findAll({
      where: { authorId: { [Op.in]: followingIds } },
      include: [{ model: User, as: "author", attributes: ["id", "username", "name", "avatar"] }],
      order: [["createdAt", "DESC"]],
    });

    res.json({ feed: followedArticles });
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

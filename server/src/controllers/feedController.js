const { Article, User, Follow, Like, Bookmark } = require("../models");
const { Op } = require("sequelize");
const enrichArticles = require("../utils/enrichArticles");

// exports.getFeed = async (req, res) => {
//   try {
//     const currentUserId = req.user.id; // from auth middleware

//     // Get the list of IDs the current user follows
//     const following = await Follow.findAll({
//       where: { followerId: currentUserId },
//       attributes: ['followingId']
//     });

//     const followingIds = following.map(f => f.followingId);

//     console.log("Following IDs:", followingIds);

//     // Query articles from followed users
//     const followedArticles = await Article.findAll({
//       where: { authorId: { [Op.in]: followingIds } },
//       include: [{ model: User, as: "author", attributes: ["id", "username", "name", "avatar"] }],
//     });

//     // Query articles from other users
//     const otherArticles = await Article.findAll({
//       where: { authorId: { [Op.notIn]: followingIds } },
//       include: [{ model: User, as: "author", attributes: ["id", "username", "name", "avatar"] }],
//     });

//     res.json({ followedArticles, otherArticles });

//   } catch (err) {
//     res.status(500).json({ message: "Failed to load feed", error: err });
//   }
// };
exports.getFeed = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const following = await Follow.findAll({
      where: { followerId: currentUserId },
      attributes: ['followingId']
    });
    const followingIds = following.map(f => f.followingId);

    const followedArticles = await Article.findAll({
      where: { authorId: { [Op.in]: followingIds } },
      include: [{ model: User, as: "author", attributes: ["id", "username", "name", "avatar"] }],
      order: [["createdAt", "DESC"]],
    });

    const otherArticles = await Article.findAll({
      where: { authorId: { [Op.notIn]: followingIds } },
      include: [{ model: User, as: "author", attributes: ["id", "username", "name", "avatar"] }],
      order: [["createdAt", "DESC"]],
    });

    const enrichedFollowed = await enrichArticles(followedArticles, currentUserId);
    const enrichedOther = await enrichArticles(otherArticles, currentUserId);
    const feeds = [...enrichedFollowed, ...enrichedOther];

    res.json(feeds.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (err) {
    res.status(500).json({ message: "Failed to load feed", error: err.message });
  }
};

exports.getLikedArticles = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const likedArticles = await req.user.getLikedArticles({
      include: [{ model: User, as: "author", attributes: ["id", "username", "name", "avatar"] }],
      order: [["createdAt", "DESC"]],
    });

    const enriched = await enrichArticles(likedArticles, currentUserId);

    res.json({ liked: enriched });
  } catch (err) {
    res.status(500).json({ message: "Failed to load liked articles", error: err.message });
  }
};


exports.getBookmarkedArticles = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const bookmarked = await req.user.getBookmarkedArticles({
      include: [{ model: User, as: "author", attributes: ["id", "username", "name", "avatar"] }],
      order: [["createdAt", "DESC"]],
    });

    const enriched = await enrichArticles(bookmarked, currentUserId);

    res.json({ bookmarked: enriched });
  } catch (err) {
    res.status(500).json({ message: "Failed to load bookmarked articles", error: err.message });
  }
};

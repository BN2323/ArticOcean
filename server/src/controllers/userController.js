const { User, Article, Like, Bookmark } = require("../models");

exports.getProfile = async (req, res) => {
  try {
    // const user = await User.findByPk(req.params.userId, {
    //   attributes: ["id", "username", "name", "bio", "avatar"],
    //   include: [
    //     { model: Article, as: "Articles" },
    //     { model: Article, as: "likedArticles" },
    //     { model: Article, as: "bookmarkedArticles" },
    //   ],
    // });

    // if (!user) return res.status(404).json({ message: "User not found" });

    // res.json(user);
    const userId = req.params.id;
    const viewerId = req.user?.id; // This assumes you're using authentication

    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "name", "bio", "avatar"]
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch articles authored by user
    const articles = await Article.findAll({
      where: { userId },
      attributes: ["id", "title", "excerpt", "createdAt", "readTime"],
      include: [
        {
          model: Like,
          attributes: ["userId"]
        },
        {
          model: Bookmark,
          attributes: ["userId"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    // Format articles with isLiked, isBookmarked
    const formattedArticles = articles.map((article) => {
      const likes = article.Likes.length;
      const comments = 0; // Placeholder if you don’t have comment count yet
      const isLiked = viewerId ? article.Likes.some(like => like.userId === viewerId) : false;
      const isBookmarked = viewerId ? article.Bookmarks.some(b => b.userId === viewerId) : false;

      return {
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        publishedAt: article.createdAt,
        readTime: article.readTime,
        likes,
        comments,
        isLiked,
        isBookmarked
      };
    });

    // Get total stats
    const totalArticles = articles.length;
    const totalLikes = await Like.count({
      include: [{
        model: Article,
        where: { userId }
      }]
    });

    // Final response
    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      avatar: user.avatar,
      bio: user.bio,
      location: "San Francisco, CA", // Optional static or from DB
      joinDate: "March 2022", // Optional static or from DB
      website: "sarahchen.com", // Optional static or from DB
      followers: 1247, // Add logic if you track followers
      following: 89, // Same here
      totalArticles,
      totalLikes,
      articles: formattedArticles
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  const { username, bio, avatar } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username ?? user.username;
    user.bio = bio ?? user.bio;
    user.avatar = avatar ?? user.avatar;

    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

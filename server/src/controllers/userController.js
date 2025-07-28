const { User, Article, Like, Follow } = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching profile for user ID:", userId);

    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "name", "bio", "avatar", "location", "joinDate", "website"],
      include: [
      {
        model: Article,
        as: "articles",
        include: [
          {
            model: User,
            as: "likers",
            attributes: ["id"]
          },
          {
            model: User,
            as: "author",
            attributes: ["id", "username", "name", "avatar"],
          },
        ]
      },
      {
        model: User,
        as: "followers",
        attributes: ["id"]
      },
      {
        model: User,
        as: "following",
        attributes: ["id"]
      }
    ]
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const userJSON = user.toJSON();

    userJSON.totalArticles = user.articles.length;
    userJSON.totalLikes = user.articles.reduce((sum, article) => sum + article.likers.length, 0); 
    userJSON.followers = user.followers.length;
    userJSON.following = user.following.length;
    userJSON.joinDate = moment(userJSON.joinDate).format("MMMM YYYY");

    userJSON.articles.forEach(article => {
      delete article.likers;
      delete article.bookmarkers; // remove only if present
    });
    console.log("Profile fetched:", userJSON);
    res.json(userJSON);

  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};


// Update profile
exports.updateProfile = async (req, res) => {
  const { username, name, bio, avatar, location, website } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username ?? user.username;
    user.name = name ?? user.name;
    user.bio = bio ?? user.bio;
    user.avatar = avatar ?? user.avatar;
    user.location = location ?? user.location;
    user.website = website ?? user.website;

    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

const { User, Article, Like, Bookmark } = require("../models");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ["id", "username", "name", "bio", "avatar"],
      include: [
        { model: Article, as: "Articles" },
        { model: Article, as: "likedArticles" },
        { model: Article, as: "bookmarkedArticles" },
      ],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  const { name, bio, avatar } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name ?? user.name;
    user.bio = bio ?? user.bio;
    user.avatar = avatar ?? user.avatar;

    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

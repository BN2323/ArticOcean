const { User } = require("../models");

exports.followUser = async (req, res) => {
  const targetUserId = req.params.id;
  const currentUserId = req.user.id;

  if (currentUserId === targetUserId) {
    return res.status(400).json({ message: "You can't follow yourself." });
  }

  try {
    const userToFollow = await User.findByPk(targetUserId);
    if (!userToFollow) return res.status(404).json({ message: "User not found." });

    const currentUser = await User.findByPk(currentUserId);
    await currentUser.addFollowing(userToFollow);

    res.status(200).json({ message: "User followed successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to follow user." });
  }
};

exports.unfollowUser = async (req, res) => {
  const targetUserId = req.params.id;
  const currentUserId = req.user.id;

  try {
    const userToUnfollow = await User.findByPk(targetUserId);
    if (!userToUnfollow) return res.status(404).json({ message: "User not found." });

    const currentUser = await User.findByPk(currentUserId);
    await currentUser.removeFollowing(userToUnfollow);

    res.status(200).json({ message: "User unfollowed successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to unfollow user." });
  }
};

const express = require("express");
const router = express.Router();
const followController = require("../controllers/followController");
const authenticate = require("../middlewares/authMiddleware"); // your auth middleware

// Follow a user
router.post("/:id/follow", authenticate, followController.followUser);

// Unfollow a user
router.delete("/:id/unfollow", authenticate, followController.unfollowUser);

module.exports = router;

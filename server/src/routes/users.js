const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const user = require("../models/user");

router.get("/:id", authMiddleware, userController.getProfile);
router.get("/", authMiddleware, userController.getMyProfile);
router.put("/", authMiddleware, userController.updateProfile);


module.exports = router;

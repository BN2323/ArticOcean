const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const user = require("../models/user");

router.get("/", authMiddleware, userController.getProfile);
router.put("/", authMiddleware, userController.updateProfile);


module.exports = router;

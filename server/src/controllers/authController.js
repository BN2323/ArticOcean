const { User } = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.register = async (req, res) => {
  console.log('Request body:', req.body);
  try {
    const { username, password, name, bio, avatar } = req.body;
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ message: "Username already taken" });

    const user = await User.create({ username, password, name, bio, avatar });
    const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ user: { id: user.id, username: user.username, name: user.name, bio: user.bio, avatar: user.avatar }, token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

exports.login = async (req, res) => {
  console.log('Request body:', req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });


    const valid = await user.validatePassword(password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: "7d" });
    
    res.json({ user: { id: user.id, username: user.username, name: user.name, bio: user.bio, avatar: user.avatar }, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

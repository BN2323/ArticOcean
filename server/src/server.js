const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const config = require("./config/config");

const authRoutes = require("./routes/auth");
const articleRoutes = require("./routes/articles");
const userRoutes = require("./routes/users");
const feedRoutes = require("./routes/feeds");
const likeRoutes = require("./routes/like");
const bookmarkRoutes = require("./routes/bookmark");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/feeds", feedRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.get("/", (req, res) => res.send("API Running"));

// Connect DB & start server
sequelize.sync().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
  });
}).catch(console.error);

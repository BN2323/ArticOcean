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
const followRoutes = require("./routes/follow");
const commentRoutes = require("./routes/comment");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/feed", feedRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/bookmark", bookmarkRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/comment", commentRoutes);

app.get("/", (req, res) => res.send("API Running"));

// Connect DB & start server
sequelize.sync().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
  });
}).catch(console.error);

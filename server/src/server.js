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
const uploadRoute = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use("/api/feed", feedRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/user", userRoutes);
app.use("/api", likeRoutes);
app.use("/api", bookmarkRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/", commentRoutes);
app.use('/api/upload', uploadRoute);

app.get("/", (req, res) => res.send("API Running"));

// Connect DB & start server
sequelize.sync().then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
  });
}).catch(console.error);

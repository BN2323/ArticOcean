const { Sequelize } = require("sequelize");
const config = require("../config/config");
const defineUser = require("./user");
const defineArticle = require("./article");
const defineLike = require("./like");
const defineBookmark = require("./bookmark");
const defineFollow = require("./follower");
const defineComment = require("./comment");


const sequelize = new Sequelize(
  config.DB.DB_NAME,
  config.DB.DB_USER,
  config.DB.DB_PASS,
  {
    host: config.DB.DB_HOST,
    dialect: "mysql",  // mysql here
    logging: false,
  }
);


const User = defineUser(sequelize);
const Article = defineArticle(sequelize);
const Like = defineLike(sequelize);
const Bookmark = defineBookmark(sequelize);
const Follow = defineFollow(sequelize);
const Comment = defineComment(sequelize);

// User follow relations
User.belongsToMany(User, {
  as: "followers",
  through: Follow,
  foreignKey: "followingId",
  otherKey: "followerId",
});

User.belongsToMany(User, {
  as: "following",
  through: Follow,
  foreignKey: "followerId",
  otherKey: "followingId",
});

// Article belongs to a User (author)
User.hasMany(Article, { as: "articles", foreignKey: "authorId" });
Article.belongsTo(User, { as: "author", foreignKey: "authorId" });

// Likes - many-to-many between User and Article
User.belongsToMany(Article, {
  through: Like,
  as: "likedArticles", // User.likedArticles: articles user liked
  foreignKey: "userId",
});
Article.belongsToMany(User, {
  through: Like,
  as: "likers",        // Article.likers: users who liked the article
  foreignKey: "articleId",
});


// Bookmarks - many-to-many between User and Article
User.belongsToMany(Article, {
  through: Bookmark,
  as: "bookmarkedArticles",
  foreignKey: "userId",
});
Article.belongsToMany(User, {
  through: Bookmark,
  as: "bookmarkers",
  foreignKey: "articleId",
});

// Comments - one-to-many
Article.hasMany(Comment, { as: "comments", foreignKey: "articleId" });
Comment.belongsTo(Article, { as: "article", foreignKey: "articleId" });

User.hasMany(Comment, { as: "comments", foreignKey: "userId" });
Comment.belongsTo(User, { as: "commenter", foreignKey: "userId" });

module.exports = {
  sequelize,
  User,
  Article,
  Like,
  Bookmark,
  Follow,
  Comment,
};

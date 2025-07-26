const { Sequelize } = require("sequelize");
const config = require("../config/config");
const User = require("./user")(sequelize);
const Article = require("./article")(sequelize);
const Like = require("./like")(sequelize);
const Bookmark = require("./bookmark")(sequelize);
const Follow = require("./follow")(sequelize);

const sequelize = new Sequelize(
  config.DB.DB_NAME,
  config.DB_USER,
  config.DB_PASS,
  {
    host: config.DB.DB_HOST,
    dialect: config.DB.DB_DIALECT,  // mysql here
    logging: false,
  }
);


// User follow relations
User.belongsToMany(User, {
  as: "followers",
  through: Follow,
  foreignKey: "followingId",
  otherKey: "followerId"
});

User.belongsToMany(User, {
  as: "following",
  through: Follow,
  foreignKey: "followerId",
  otherKey: "followingId"
});

// Relations
User.hasMany(Article, { foreignKey: "authorId" });
Article.belongsTo(User, { as: "author", foreignKey: "authorId" });

User.belongsToMany(Article, { through: Like, as: "likedArticles", foreignKey: "userId" });
Article.belongsToMany(User, { through: Like, as: "likedByUsers", foreignKey: "articleId" });

User.belongsToMany(Article, { through: Bookmark, as: "bookmarkedArticles", foreignKey: "userId" });
Article.belongsToMany(User, { through: Bookmark, as: "bookmarkedByUsers", foreignKey: "articleId" });

module.exports = {
  sequelize,
  User,
  Article,
  Like,
  Bookmark,
  Follow,
};
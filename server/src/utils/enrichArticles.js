const { Like, Bookmark, Comment } = require("../models");

const enrichArticles = async (articles, currentUserId) => {
  return Promise.all(articles.map(async (article) => {
    const [likes, bookmarks, comments] = await Promise.all([
      article.countLikers?.() ?? Like.count({ where: { articleId: article.id } }),
      article.countBookmarkers?.() ?? Bookmark.count({ where: { articleId: article.id } }),
      article.countComments?.() ?? Comment.count({ where: { articleId: article.id } }),
    ]);

    const [isLiked, isBookmarked] = await Promise.all([
      Like.findOne({ where: { articleId: article.id, userId: currentUserId } }),
      Bookmark.findOne({ where: { articleId: article.id, userId: currentUserId } }),
    ]);


    return {
      ...article.toJSON(),
      totalLikes: likes,
      totalBookmarks: bookmarks,
      totalComments: comments,
      isLiked: !!isLiked,
      isBookmarked: !!isBookmarked,
    };
  }));
};

module.exports = enrichArticles;
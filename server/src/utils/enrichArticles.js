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

    const plainArticle = article.toJSON();

    // Remove HTML tags and truncate content to 70 characters
    if (plainArticle.content) {
      const noHTML = plainArticle.content.replace(/<[^>]*>/g, '');
      plainArticle.content = noHTML.length > 70 ? noHTML.slice(0, 70) + '...' : noHTML;
    }

    return {
      ...plainArticle,
      totalLikes: likes,
      totalBookmarks: bookmarks,
      totalComments: comments,
      isLiked: !!isLiked,
      isBookmarked: !!isBookmarked,
    };
  }));
};

module.exports = enrichArticles;

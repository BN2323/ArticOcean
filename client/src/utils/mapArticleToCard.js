import { formatDistanceToNow } from "date-fns";

const mapArticleToCard = (a) => ({
    id: a.id,
    title: a.title,
    excerpt: a.excerpt,
    author: {
      id: a.author.id,
      name: a.author.name,
      avatar: a.author.avatar,
    },
    publishedAt: formatDistanceToNow(new Date(a.createdAt), { addSuffix: true }),
    readTime: Math.floor(Math.random() * 5) + 3,
    likes: a.totalLikes,
    comments: a.totalComments,
    image: a.thumbnail,
    isLiked: a.isLiked,
    isBookmarked: a.isBookmarked,
});

export default mapArticleToCard;
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Bookmark, Share, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DOMPurify from 'dompurify';
import {
  likeArticle,
  unlikeArticle,
  bookmarkArticle,
  unbookmarkArticle,
  addComment
} from "@/services/articleService"; // Adjust path if needed
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";
import axios from "axios";


const ArticleView = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
    const { toast } = useToast();
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;



  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE}/article/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticle(response.data);
        setComments(response.data.comments || []);
      } catch (err) {
        setError("Failed to load article.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unlikeArticle(id); // backend call
        setLikes(likes - 1);
        setIsLiked(false);
        toast({ description: "Removed from likes" });
      } else {
        await likeArticle(id); // backend call
        setLikes(likes + 1);
        setIsLiked(true);
        toast({ description: "Added to likes ❤️" });
      }
    } catch (err) {
      toast({
        description: "Failed to update like",
        variant: "destructive",
      });
    }
  };
  
  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await unbookmarkArticle(id); // backend call
        setIsBookmarked(false);
        toast({ description: "Removed from bookmarks" });
      } else {
        await bookmarkArticle(id); // backend call
        setIsBookmarked(true);
        toast({ description: "Added to bookmarks 📚" });
      }
    } catch (err) {
      toast({
        description: "Failed to update bookmark",
        variant: "destructive",
      });
    }
  };
  
  const handleShare = async () => {
    const url = `${window.location.origin}/article/${id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: excerpt,
          url: url,
        });
      } catch (error) {
        // User cancelled sharing or share failed
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast({
          description: "Article link copied to clipboard! 🔗",
        });
      } catch (error) {
        toast({
          description: "Failed to copy link",
          variant: "destructive",
        });
      }
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) {
      toast({ description: "Comment cannot be empty", variant: "destructive" });
      return;
    }

    try {
      const newComment = { content: commentText.trim() };
      const response = await addComment(id, newComment);
      setComments((prev) => [response.data, ...prev]); // add new comment on top or bottom as you prefer
      setCommentText("");
      toast({ description: "Comment posted!" });
    } catch (error) {
      toast({ description: "Failed to post comment", variant: "destructive" });
    }
  };

  if (!article) {
    return <div className="text-center text-muted-foreground py-10">Loading article...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">{article.title}</h1>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={article.author.avatar} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  to={`/profile/${article.author.username}`}
                  className="text-base font-medium text-foreground hover:text-primary transition-smooth"
                >
                  {article.author.name}
                </Link>
                <div className="text-sm text-muted-foreground">
                  {article.publishedAt} · {article.readTime} min read
                </div>
              </div>
            </div>

            <Button variant="ghost" size="sm">
              <MoreHorizontal size={20} />
            </Button>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between border-t border-b border-border py-4">
            <div className="flex items-center space-x-6">
              <Button
                onClick={handleLike}
                variant="ghost"
                size="sm"
                className={`${isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500 transition-smooth`}
              >
                <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                <span className="ml-2">{likes}</span>
              </Button>

              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground transition-smooth">
                <MessageCircle size={20} />
                <span className="ml-2">{article.comments.length}</span>
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={handleBookmark}
                variant="ghost"
                size="sm"
                className={`${article.isBookmarked ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-smooth`}
              >
                <Bookmark size={20} className={article.isBookmarked ? 'fill-current' : ''} />
              </Button>
              <Button onClick={handleShare} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground transition-smooth">
                <Share size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
        >
        </div>

        {/* Author Bio */}
        <Card className="p-6 mb-8 border-border">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={article.author.avatar} />
              <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">{article.author.name}</h3>
              <p className="text-muted-foreground mb-4">{article.author.bio}</p>
              <Button variant="outline" size="sm">Follow</Button>
            </div>
          </div>
        </Card>

        {/* Comments Section */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-6">
            {article.comments.length} {article.comments.length === 1 ? "Comment" : "Comments"}
          </h3>

          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id} className="p-4 border-border">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.commenter.avatar} />
                    <AvatarFallback>{comment.commenter?.name ? comment.commenter.name.charAt(0) : "?"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-foreground">{comment.commenter.name}</span>
                      <span className="text-xs text-muted-foreground">@{comment.commenter.username}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{comment.publishedAt}</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-3">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-red-500 transition-smooth">
                        <Heart size={14} />
                        <span className="ml-1">1</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {isAuthenticated ? (
            <Card className="p-4 mt-6 border-border">
              <div>
                <textarea
                  className="w-full border rounded p-2 text-sm text-foreground bg-background border-border mb-3"
                  placeholder="Write a comment..."
                  rows={3}
                  onChange={(e) => {setCommentText(e.target.value);
                    console.log(commentText)
                  }}
                />
                <div className="flex justify-end">
                  <Button size="sm" onClick={handleComment}>Post Comment</Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-4 mt-6 border-border">
              <div className="text-center text-muted-foreground">
                <p className="mb-4">Join the conversation</p>
                <Button asChild>
                  <Link to="/login">Sign in to comment</Link>
                </Button>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
};

export default ArticleView;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Bookmark, Share } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  likeArticle,
  unlikeArticle,
  bookmarkArticle,
  unbookmarkArticle,
} from "../services/articleService";


const ArticleCard = ({ 
  id, 
  title, 
  excerpt, 
  author, 
  publishedAt, 
  readTime, 
  likes: initialLikes, 
  comments: initialComments, 
  image,
  isLiked: initialIsLiked = false,
  isBookmarked: initialIsBookmarked = false 
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [comments] = useState(initialComments);
  const { toast } = useToast();

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

  const handleComment = () => {
    // Navigate to article with comment section focused
    window.location.href = `/article/${id}#comments`;
  };
  return (
    <Card className="border-border bg-card hover:shadow-elegant transition-smooth">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Link
              to={`/profile/${author.username}`}
              className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
            >
              {author.name}
            </Link>
            <div className="text-xs text-muted-foreground">
              {publishedAt} · {readTime} min read
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Link to={`/article/${id}`}>
              <h2 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition-smooth line-clamp-2">
                {title}
              </h2>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                {excerpt}
              </p>
            </Link>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`text-xs ${
                    isLiked ? "text-red-500" : "text-muted-foreground"
                  } hover:text-red-500 transition-smooth`}
                >
                  <Heart size={16} className={isLiked ? "fill-current" : ""} />
                  <span className="ml-1">{likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleComment}
                  className="text-xs text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <MessageCircle size={16} />
                  <span className="ml-1">{comments}</span>
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBookmark}
                  className={`${
                    isBookmarked ? "text-primary" : "text-muted-foreground"
                  } hover:text-primary transition-smooth`}
                >
                  <Bookmark size={16} className={isBookmarked ? "fill-current" : ""} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <Share size={16} />
                </Button>
              </div>
            </div>
          </div>

          {image && (
            <div className="hidden sm:block w-32 h-32 rounded-lg overflow-hidden bg-muted shrink-0 ml-6">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ArticleCard;
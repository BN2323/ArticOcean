import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Bookmark, Share, MoreHorizontal } from "lucide-react";

const ArticleView = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then(res => res.json())
      .then(data => setArticle(data))
      .catch(err => console.error("Error fetching article:", err));

    fetch(`/api/articles/${id}/comments`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.error("Error fetching comments:", err));
  }, [id]);

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
                variant="ghost"
                size="sm"
                className={`${article.isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500 transition-smooth`}
              >
                <Heart size={20} className={article.isLiked ? 'fill-current' : ''} />
                <span className="ml-2">{article.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground transition-smooth">
                <MessageCircle size={20} />
                <span className="ml-2">{article.comments}</span>
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className={`${article.isBookmarked ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-smooth`}
              >
                <Bookmark size={20} className={article.isBookmarked ? 'fill-current' : ''} />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground transition-smooth">
                <Share size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {article.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-2xl font-semibold mb-4 mt-8 text-foreground">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.match(/^\d+\./)) {
              const items = paragraph.split(/\d+\./).filter(item => item.trim());
              return (
                <ol key={index} className="list-decimal list-inside space-y-2 mb-6">
                  {items.map((item, i) => (
                    <li key={i} className="text-foreground leading-relaxed">
                      {item.trim()}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={index} className="mb-4 leading-relaxed text-foreground">
                {paragraph}
              </p>
            );
          })}
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
            Comments ({article.comments})
          </h3>

          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id} className="p-4 border-border">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-foreground">{comment.author.name}</span>
                      <span className="text-xs text-muted-foreground">@{comment.author.username}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{comment.publishedAt}</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-3">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-red-500 transition-smooth">
                        <Heart size={14} />
                        <span className="ml-1">{comment.likes}</span>
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

          <Card className="p-4 mt-6 border-border">
            <div className="text-center text-muted-foreground">
              <p className="mb-4">Join the conversation</p>
              <Button>Sign in to comment</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;

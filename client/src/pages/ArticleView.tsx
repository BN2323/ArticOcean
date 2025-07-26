import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Bookmark, Share, MoreHorizontal } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ArticleView = () => {
  const { id } = useParams();

  // Sample article data - would come from API
  const article = {
    id: "1",
    title: "The Art of Deep Thinking in a Shallow World",
    content: `In an age of quick takes and surface-level content, how do we cultivate the ability to think deeply? This question has become increasingly urgent as our attention spans fragment and our feeds fill with bite-sized content designed for immediate consumption.

## The Lost Art of Contemplation

Deep thinking isn't just about intelligence—it's about creating the mental space for ideas to develop, mature, and interconnect. The ancient Greeks called this "contemplation," a practice they considered essential to the examined life.

Consider the difference between knowing something and understanding it. We might know that climate change is happening, but understanding it requires grasping the complex interplay of atmospheric science, economics, politics, and human behavior. This kind of understanding can only emerge through sustained, focused thought.

## Creating Mental Space

Our brains need downtime to process information and form connections. Research shows that our best insights often come during moments of relaxation—in the shower, on a walk, or just before sleep. These are the moments when our default mode network, the brain's "screensaver," gets to work.

Yet we've systematically eliminated these moments from our lives. Every spare second is filled with notifications, updates, and stimulation. We've become afraid of boredom, not realizing that boredom is often the gateway to creativity.

## The Depth vs. Speed Paradox

The modern world rewards speed: quick responses, rapid iterations, immediate reactions. But the most important problems—climate change, inequality, technological ethics—require slow, careful thought. They require us to sit with uncertainty, to entertain contradictory ideas, and to resist the urge to reach premature conclusions.

This creates a fundamental tension. The skills that make us successful in our fast-paced world are often the opposite of those required for deep thinking. We must learn to toggle between modes: fast when speed serves us, slow when depth is required.

## Practical Steps Toward Deeper Thinking

1. **Protect your attention**: Treat your focus as a finite resource. Be intentional about what you allow into your mental space.

2. **Embrace boredom**: Schedule time for unstructured thinking. Take walks without podcasts. Sit without immediately reaching for your phone.

3. **Read long-form content**: Train your mind to sustain attention on complex ideas. Books, long articles, and in-depth documentaries all serve this purpose.

4. **Practice intellectual humility**: Hold your opinions lightly. Be willing to change your mind when presented with compelling evidence.

5. **Seek diverse perspectives**: Deep thinking thrives on the collision of different viewpoints. Actively seek out ideas that challenge your assumptions.

The goal isn't to think slowly about everything—that would be paralyzing. Instead, it's to develop the wisdom to know when a situation calls for depth and to have the mental tools ready when you need them.

In a world that increasingly rewards the shallow, choosing depth is both a personal practice and a form of cultural resistance. It's a bet that understanding trumps information, that wisdom matters more than cleverness, and that the examined life is still worth living.`,
    author: {
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "/api/placeholder/40/40",
      bio: "Cognitive scientist and writer exploring the intersection of technology and human thinking."
    },
    publishedAt: "2 hours ago",
    readTime: 8,
    likes: 127,
    comments: 23,
    isLiked: false,
    isBookmarked: true
  };

  const comments = [
    {
      id: "1",
      author: {
        name: "David Park",
        username: "davidp",
        avatar: "/api/placeholder/32/32"
      },
      content: "This resonates deeply with my experience in software engineering. The pressure to ship fast often prevents us from thinking through the long-term implications of our architectural decisions.",
      publishedAt: "1 hour ago",
      likes: 12
    },
    {
      id: "2",
      author: {
        name: "Maria Santos",
        username: "marias",
        avatar: "/api/placeholder/32/32"
      },
      content: "I've been experimenting with digital detox periods specifically for this reason. Even 30 minutes of phone-free thinking time makes a huge difference in my creativity and problem-solving abilities.",
      publishedAt: "45 minutes ago",
      likes: 8
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
            {article.title}
          </h1>
          
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
                      {item.trim().replace(/^\*\*(.*?)\*\*:/, '<strong>$1</strong>:')}
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
          <h3 className="text-2xl font-semibold text-foreground mb-6">Comments ({article.comments})</h3>
          
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
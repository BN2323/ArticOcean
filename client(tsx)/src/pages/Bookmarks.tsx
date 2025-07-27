import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bookmark, Search } from "lucide-react";

const Bookmarks = () => {
  // Sample bookmarked articles
  const bookmarkedArticles = [
    {
      id: "1",
      title: "The Art of Deep Thinking in a Shallow World",
      excerpt: "In an age of quick takes and surface-level content, how do we cultivate the ability to think deeply? This article explores the cognitive tools and habits that enable profound thinking.",
      author: {
        name: "Sarah Chen",
        username: "sarahchen",
        avatar: "/api/placeholder/32/32"
      },
      publishedAt: "2 hours ago",
      readTime: 8,
      likes: 127,
      comments: 23,
      image: "/api/placeholder/96/96",
      isLiked: false,
      isBookmarked: true
    },
    {
      id: "3",
      title: "The Psychology of Remote Work: What 3 Years Taught Us",
      excerpt: "After three years of distributed work, we're finally understanding the psychological impacts. This isn't just about productivity metrics—it's about human connection, creativity, and mental health.",
      author: {
        name: "Dr. Elena Rodriguez",
        username: "drelena",
        avatar: "/api/placeholder/32/32"
      },
      publishedAt: "1 day ago",
      readTime: 15,
      likes: 234,
      comments: 41,
      image: "/api/placeholder/96/96",
      isLiked: false,
      isBookmarked: true
    },
    {
      id: "4",
      title: "Minimalism in Code: Why Less Really Is More",
      excerpt: "Twenty years of programming has taught me that the best code isn't the cleverest—it's the simplest. Here's why minimalism in software development leads to better maintainability.",
      author: {
        name: "Alex Kim",
        username: "alexk",
        avatar: "/api/placeholder/32/32"
      },
      publishedAt: "2 days ago",
      readTime: 6,
      likes: 156,
      comments: 28,
      isLiked: true,
      isBookmarked: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Bookmark className="text-primary" size={32} />
            <h1 className="text-3xl font-bold text-foreground">Your Bookmarks</h1>
          </div>
          <p className="text-muted-foreground">Articles you've saved for later reading</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <Input 
            placeholder="Search your bookmarks..." 
            className="pl-10 transition-smooth"
          />
        </div>

        {bookmarkedArticles.length > 0 ? (
          <div className="space-y-6">
            {bookmarkedArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Bookmark className="mx-auto mb-6 text-muted-foreground" size={64} />
            <h2 className="text-2xl font-semibold text-foreground mb-2">No bookmarks yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start bookmarking articles you want to read later. Click the bookmark icon on any article to save it here.
            </p>
            <Button variant="outline" size="lg">
              Explore Articles
            </Button>
          </div>
        )}

        {bookmarkedArticles.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              {bookmarkedArticles.length} article{bookmarkedArticles.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
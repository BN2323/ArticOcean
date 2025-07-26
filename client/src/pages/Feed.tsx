import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Feed = () => {
  // Sample data - this would come from an API in a real app
  const articles = [
    {
      id: "1",
      title: "The Art of Deep Thinking in a Shallow World",
      excerpt: "In an age of quick takes and surface-level content, how do we cultivate the ability to think deeply? This article explores the cognitive tools and habits that enable profound thinking, from the ancient Greeks to modern neuroscience.",
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
      id: "2",
      title: "Building Communities That Last: Lessons from Online Platforms",
      excerpt: "What makes some online communities thrive for decades while others fade within months? A deep dive into the principles of sustainable community building, examining case studies from Reddit, Discord, and lesser-known success stories.",
      author: {
        name: "Marcus Thompson",
        username: "marcust",
        avatar: "/api/placeholder/32/32"
      },
      publishedAt: "5 hours ago",
      readTime: 12,
      likes: 89,
      comments: 15,
      isLiked: true,
      isBookmarked: false
    },
    {
      id: "3",
      title: "The Psychology of Remote Work: What 3 Years Taught Us",
      excerpt: "After three years of distributed work, we're finally understanding the psychological impacts. This isn't just about productivity metrics—it's about human connection, creativity, and mental health in the digital age.",
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
      isBookmarked: false
    },
    {
      id: "4",
      title: "Minimalism in Code: Why Less Really Is More",
      excerpt: "Twenty years of programming has taught me that the best code isn't the cleverest—it's the simplest. Here's why minimalism in software development leads to better maintainability, fewer bugs, and happier teams.",
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Discover Deep Thoughts</h1>
          <p className="text-muted-foreground">Thoughtful articles from a community of thinkers</p>
        </div>

        <Tabs defaultValue="latest" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          
          <TabsContent value="latest" className="space-y-6 mt-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </TabsContent>
          
          <TabsContent value="trending" className="space-y-6 mt-6">
            {articles
              .sort((a, b) => b.likes - a.likes)
              .map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
          </TabsContent>
          
          <TabsContent value="following" className="space-y-6 mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Follow writers to see their latest articles here</p>
              <Button variant="outline">Discover Writers</Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
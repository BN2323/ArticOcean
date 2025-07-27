import { useState, useEffect } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Feed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Example fetch, replace `/api/articles` with your backend route
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Failed to fetch articles:", err));
  }, []);

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
              .slice()
              .sort((a, b) => b.likes - a.likes)
              .map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
          </TabsContent>

          <TabsContent value="following" className="space-y-6 mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Follow writers to see their latest articles here
              </p>
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

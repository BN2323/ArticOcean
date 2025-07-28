import { useState, useEffect } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
const apiurl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";


const Feed = () => {
  // const [articles, setArticles] = useState([]);

  // useEffect(() => {
  //   const mockData = [
    // {
    //   id: 1,
    //   title: "Mastering React Server Components",
    //   excerpt: "React Server Components (RSC) let you build modern apps with less client JS...",
    //   author: {
    //     id: 1,
    //     name: "Jane Doe",
    //     avatar: "https://i.pravatar.cc/100?img=1"
    //   },
  //     publishedAt: new Date().toISOString(),
  //     readTime: 5,
  //     likes: 12,
  //     comments: 3,
  //     image: "https://source.unsplash.com/600x300/?code",
  //     isLiked: false,
  //     isBookmarked: false
  //   },
  //   {
  //     id: 2,
  //     title: "Why Functional Programming Matters",
  //     excerpt: "Functional programming is a paradigm centered around immutability and pure functions...",
  //     author: {
  //       id: 2,
  //       name: "John Smith",
  //       avatar: "https://i.pravatar.cc/100?img=2"
  //     },
  //     publishedAt: new Date().toISOString(),
  //     readTime: 6,
  //     likes: 28,
  //     comments: 5,
  //     image: "https://source.unsplash.com/600x300/?technology",
  //     isLiked: true,
  //     isBookmarked: true
  //   }
  // ];

  // setArticles(mockData);
  const [articles, setArticles] = useState([]);
  const [followingArticles, setFollowingArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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

  useEffect(() => {
    const fetchFollowingArticles = async () => {
      try {
        const res = await axios.get(`${apiurl}/feed/following`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Map data here before setting state:
        const mappedArticles = res.data.map(mapArticleToCard);
        setFollowingArticles(mappedArticles);
        setLoading(false);
        console.log("Fetched articles:", mappedArticles);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError("Failed to load articles.");
        setLoading(false);
      }
    };

    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${apiurl}/feed`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Map data here before setting state:
        const mappedArticles = res.data.map(mapArticleToCard);
        setArticles(mappedArticles);
        setLoading(false);
        console.log("Fetched articles:", mappedArticles);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError("Failed to load articles.");
        setLoading(false);
      }
    };

    fetchArticles();
    fetchFollowingArticles();
  }, []);



  const trendingArticles = [...articles].sort((a, b) => b.likesCount - a.likesCount);


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
            {trendingArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
          </TabsContent>

          <TabsContent value="following" className="space-y-6 mt-6">
            {followingArticles.length > 0 ? (
              followingArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No articles from followed users yet</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Refresh Feed
                </Button>
              </div>
            )}
            {/* <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Follow writers to see their latest articles here
              </p>
              <Button variant="outline">Discover Writers</Button>
            </div> */}
          </TabsContent>
        </Tabs>

        {/* <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Feed;

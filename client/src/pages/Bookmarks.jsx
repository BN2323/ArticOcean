import { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bookmark, Search } from "lucide-react";
import mapArticleToCard from "../utils/mapArticleToCard";
const apiurl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";
import axios from "axios";


const Bookmarks = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${apiurl}/feed/bookmarked`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Map data here before setting state:
        const mappedArticles = res.data.map(mapArticleToCard);
        setBookmarkedArticles(mappedArticles);
        setLoading(false);
        console.log("Fetched articles:", mappedArticles);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError("Failed to load articles.");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = bookmarkedArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredArticles.length > 0 ? (
          <div className="space-y-6">
            {filteredArticles.map((article) => (
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

        {filteredArticles.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} saved
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;

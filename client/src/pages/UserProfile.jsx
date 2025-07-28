import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleCard from "@/components/ArticleCard";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Link as LinkIcon,
  Users,
  FileText,
  Heart,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import mapArticleToCard from "../utils/mapArticleToCard";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);


  // Get current logged-in user from localStorage
  let currentUser = null;
  try {
    const userStr = localStorage.getItem("user");
    if (userStr) currentUser = JSON.parse(userStr);
  } catch {
    currentUser = null;
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/user/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No user data found.</p>;

  const userArticles = user.articles || [];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="p-8 mb-8 border-border shadow-elegant">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user.avatar || "/placeholder.png"} />
              <AvatarFallback className="text-2xl">
                {user.name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-1">
                    {user.name}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    @{user.username}
                  </p>
                </div>
              </div>

              <p className="text-foreground mb-4 leading-relaxed">{user.bio}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                {user.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.joinDate && (
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>Joined {user.joinDate}</span>
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center space-x-1">
                    <LinkIcon size={16} />
                    <a
                      href={`https://${user.website}`}
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.website}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Users size={16} className="text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {user.followers?.toLocaleString() || 0}
                  </span>
                  <span className="text-muted-foreground">followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium text-foreground">
                    {user.following || 0}
                  </span>
                  <span className="text-muted-foreground">following</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 text-center border-border">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FileText className="text-primary" size={20} />
              <span className="text-2xl font-bold text-foreground">
                {user.totalArticles || 0}
              </span>
            </div>
            <p className="text-muted-foreground">Articles Published</p>
          </Card>
          <Card className="p-6 text-center border-border">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Heart className="text-red-500" size={20} />
              <span className="text-2xl font-bold text-foreground">
                {user.totalLikes?.toLocaleString() || 0}
              </span>
            </div>
            <p className="text-muted-foreground">Total Likes</p>
          </Card>
          <Card className="p-6 text-center border-border">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Users className="text-primary" size={20} />
              <span className="text-2xl font-bold text-foreground">
                {user.followers?.toLocaleString() || 0}
              </span>
            </div>
            <p className="text-muted-foreground">Followers</p>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="articles" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="liked">Liked</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            {userArticles.length > 0 ? (
              userArticles.map((article) => (
                <ArticleCard key={article.id} {...mapArticleToCard(article)} />
              ))
            ) : (
              <p className="text-muted-foreground text-center">
                No articles published yet.
              </p>
            )}
          </TabsContent>

          <TabsContent value="liked" className="space-y-6">
            <div className="text-center py-12">
              <Heart className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground mb-4">Liked articles are private</p>
              <p className="text-sm text-muted-foreground">
                Only you can see the articles you've liked
              </p>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card className="p-6 border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                About {user.name}
              </h3>
              <div className="space-y-4 text-foreground">
                <p className="leading-relaxed">{user.bio}</p>
                <div className="space-y-2 text-sm">
                  {user.location && (
                    <div className="flex items-center space-x-3">
                      <MapPin size={16} className="text-muted-foreground" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.joinDate && (
                    <div className="flex items-center space-x-3">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span>Member since {user.joinDate}</span>
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center space-x-3">
                      <LinkIcon size={16} className="text-muted-foreground" />
                      <a
                        href={`https://${user.website}`}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;

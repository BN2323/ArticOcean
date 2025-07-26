import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleCard from "@/components/ArticleCard";
import { MapPin, Calendar, Link as LinkIcon, Users, FileText, Heart } from "lucide-react";

const Profile = () => {
  const user = {
    name: "Sarah Chen",
    username: "sarahchen",
    avatar: "/api/placeholder/120/120",
    bio: "Cognitive scientist and writer exploring the intersection of technology and human thinking. PhD in Cognitive Psychology from MIT.",
    location: "San Francisco, CA",
    joinDate: "March 2022",
    website: "sarahchen.com",
    followers: 1247,
    following: 89,
    totalArticles: 23,
    totalLikes: 3421
  };

  const userArticles = [
    {
      id: "1",
      title: "The Art of Deep Thinking in a Shallow World",
      excerpt: "In an age of quick takes and surface-level content, how do we cultivate the ability to think deeply? This article explores the cognitive tools and habits that enable profound thinking.",
      author: user,
      publishedAt: "2 hours ago",
      readTime: 8,
      likes: 127,
      comments: 23,
      isLiked: false,
      isBookmarked: true
    },
    {
      id: "5",
      title: "Attention as Currency: The Economics of Focus",
      excerpt: "Your attention is being bought and sold, but most people don't realize they're the product. Understanding the attention economy is crucial for protecting your mental resources.",
      author: user,
      publishedAt: "1 week ago",
      readTime: 10,
      likes: 189,
      comments: 31,
      isLiked: true,
      isBookmarked: false
    },
    {
      id: "6",
      title: "The Neuroscience of Creativity: What Brain Scans Reveal",
      excerpt: "Recent advances in neuroimaging are revealing the biological basis of creativity. What we're learning could revolutionize how we think about innovation and problem-solving.",
      author: user,
      publishedAt: "2 weeks ago",
      readTime: 12,
      likes: 203,
      comments: 18,
      image: "/api/placeholder/96/96",
      isLiked: false,
      isBookmarked: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="p-8 mb-8 border-border shadow-elegant">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-1">{user.name}</h1>
                  <p className="text-muted-foreground text-lg">@{user.username}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Button className="gradient-primary text-primary-foreground shadow-elegant">
                    Follow
                  </Button>
                </div>
              </div>
              
              <p className="text-foreground mb-4 leading-relaxed">{user.bio}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>Joined {user.joinDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LinkIcon size={16} />
                  <a href={`https://${user.website}`} className="text-primary hover:underline">
                    {user.website}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Users size={16} className="text-muted-foreground" />
                  <span className="font-medium text-foreground">{user.followers.toLocaleString()}</span>
                  <span className="text-muted-foreground">followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium text-foreground">{user.following}</span>
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
              <span className="text-2xl font-bold text-foreground">{user.totalArticles}</span>
            </div>
            <p className="text-muted-foreground">Articles Published</p>
          </Card>
          <Card className="p-6 text-center border-border">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Heart className="text-red-500" size={20} />
              <span className="text-2xl font-bold text-foreground">{user.totalLikes.toLocaleString()}</span>
            </div>
            <p className="text-muted-foreground">Total Likes</p>
          </Card>
          <Card className="p-6 text-center border-border">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Users className="text-primary" size={20} />
              <span className="text-2xl font-bold text-foreground">{user.followers.toLocaleString()}</span>
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
            {userArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </TabsContent>
          
          <TabsContent value="liked" className="space-y-6">
            <div className="text-center py-12">
              <Heart className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground mb-4">Liked articles are private</p>
              <p className="text-sm text-muted-foreground">Only you can see the articles you've liked</p>
            </div>
          </TabsContent>
          
          <TabsContent value="about" className="space-y-6">
            <Card className="p-6 border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">About {user.name}</h3>
              <div className="space-y-4 text-foreground">
                <p className="leading-relaxed">{user.bio}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-3">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span>Member since {user.joinDate}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <LinkIcon size={16} className="text-muted-foreground" />
                    <a href={`https://${user.website}`} className="text-primary hover:underline">
                      {user.website}
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
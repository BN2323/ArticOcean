import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { PenSquare, Heart, Bookmark, User, Home } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">D</span>
          </div>
          <span className="text-xl font-bold text-foreground">Deep</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth ${
              isActive("/") 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <Home size={18} />
            <span>Feed</span>
          </Link>
          <Link
            to="/write"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth ${
              isActive("/write") 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <PenSquare size={18} />
            <span>Write</span>
          </Link>
          <Link
            to="/bookmarks"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth ${
              isActive("/bookmarks") 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <Bookmark size={18} />
            <span>Bookmarks</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Heart size={18} />
          </Button>
          <Link to="/profile">
            <Button variant="ghost" size="sm">
              <User size={18} />
            </Button>
          </Link>
          <Button size="sm" className="gradient-primary text-primary-foreground shadow-elegant">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
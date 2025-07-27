import { Button } from "@/components/ui/button";
import { NavLink, useLocation } from "react-router-dom";
import { PenSquare, Heart, Bookmark, User, Home, Settings } from "lucide-react";

const navigation = [
  { title: "Feed", url: "/", icon: Home },
  { title: "Bookmarks", url: "/bookmarks", icon: Bookmark },
];

const AppSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const getNavClass = (path) =>
    isActive(path)
      ? "bg-accent text-accent-foreground rounded-xl"
      : "hover:bg-accent/50 rounded-xl";

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-background/95 backdrop-blur border border-border rounded-2xl shadow-elegant p-4 w-16 flex flex-col items-center space-y-4 animate-fade-in">

        {/* Navigation */}
        <div className="space-y-3">
          {navigation.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={`flex items-center justify-center w-8 h-8 transition-smooth ${getNavClass(item.url)}`}
              title={item.title}
            >
              <item.icon size={18} />
            </NavLink>
          ))}
        </div>

        {/* Write Button - Centered */}
        <div className="py-2">
          <NavLink to="/write">
            <Button
              size="sm"
              className={`w-8 h-8 p-0 gradient-primary text-primary-foreground shadow-elegant rounded-xl transition-smooth hover-scale ${
                isActive("/write") ? "ring-2 ring-primary/50" : ""
              }`}
              title="Write Article"
            >
              <PenSquare size={16} />
            </Button>
          </NavLink>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 hover:bg-accent/50 rounded-xl transition-smooth"
            title="Liked Articles"
          >
            <Heart size={16} />
          </Button>

          <NavLink to="/profile">
            <Button
              variant="ghost"
              size="sm"
              className={`w-8 h-8 p-0 transition-smooth ${getNavClass("/profile")}`}
              title="Profile"
            >
              <User size={16} />
            </Button>
          </NavLink>

          <NavLink to="/settings">
            <Button
              variant="ghost"
              size="sm"
              className={`w-8 h-8 p-0 transition-smooth ${getNavClass("/settings")}`}
              title="Settings"
            >
              <Settings size={16} />
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const TopHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists to set login state
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/signin"); // redirect after logout
  };

  return (
    <header className="h-16 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6 sticky top-0 z-40">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">D</span>
        </div>
        <span className="text-xl font-bold text-foreground">Deep</span>
      </Link>

      <div className="flex items-center space-x-3">
        {!isLoggedIn ? (
          <>
            <Button variant="outline" size="sm" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button 
              size="sm" 
              className="gradient-primary text-primary-foreground shadow-elegant"
              asChild
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Log Out
          </Button>
        )}
      </div>
    </header>
  );
};

export default TopHeader;

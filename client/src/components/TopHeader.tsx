import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TopHeader = () => {
  return (
    <header className="h-16 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6 sticky top-0 z-40">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">D</span>
        </div>
        <span className="text-xl font-bold text-foreground">Deep</span>
      </Link>

      <div className="flex items-center space-x-3">
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
      </div>
    </header>
  );
};

export default TopHeader;
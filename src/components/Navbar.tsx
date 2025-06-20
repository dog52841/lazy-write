
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { PenTool, User, Settings, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <PenTool className="h-8 w-8 text-orange-500" />
            <span className="font-quicksand font-bold text-2xl text-gray-900">LazyWrite</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/pricing" className="text-gray-700 hover:text-orange-500 transition-colors">
              Pricing
            </Link>
            {user && location.pathname === "/app" && (
              <>
                <Link to="/settings" className="text-gray-700 hover:text-orange-500 transition-colors">
                  <Settings className="h-5 w-5" />
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600">Free Plan</span>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!user && location.pathname !== "/auth" && (
              <Link to="/auth">
                <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                  Sign In
                </Button>
              </Link>
            )}
            {!user && location.pathname === "/" && (
              <Link to="/app">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Try Free
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

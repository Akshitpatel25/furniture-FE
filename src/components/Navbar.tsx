import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Search, Home, Package, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Mock user state - replace with actual auth
  const userRole = null; // 'admin' | 'supplier' | 'customer' | null
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">FurnitureHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/products') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/categories" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/categories') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Categories
            </Link>
            {userRole === 'admin' && (
              <Link 
                to="/admin" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/admin') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Users className="inline h-4 w-4 mr-1" />
                Admin
              </Link>
            )}
            {userRole === 'supplier' && (
              <Link 
                to="/supplier" 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/supplier') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Package className="inline h-4 w-4 mr-1" />
                Supplier
              </Link>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search furniture..." 
                className="pl-10 bg-secondary border-border"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
            {userRole ? (
              <Button variant="ghost" size="icon" asChild>
                <Link to={`/${userRole}`}>
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button variant="default" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search furniture..." 
                className="pl-10 bg-secondary"
              />
            </div>
            <Link 
              to="/" 
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/categories" 
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/cart" 
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="inline h-4 w-4 mr-2" />
              Cart
            </Link>
            {!userRole && (
              <Link 
                to="/login" 
                className="block py-2 text-sm font-medium hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

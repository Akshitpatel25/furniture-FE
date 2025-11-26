import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Search, Home, Package, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import { Footer } from "./Footer";

type NavbarProps = {
  children?: React.ReactNode;
  isLayout?: boolean;
};

export const Navbar = ({ children, isLayout = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const authContext = useContext(AuthContext);
  const contextUser = authContext?.user;
  
  const userRole = user?.role || null;
  const isAdminOrSupplier = contextUser?.role === 'admin' || contextUser?.role === 'supplier';
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Admin/Supplier Header with layout
  if (isAdminOrSupplier && isLayout) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2">
                <Home className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">FurnitureHub</span>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <p className="font-medium">{contextUser?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{contextUser?.role}</p>
                </div>
                <Button variant="default" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    );
  }

  // Customer Navbar with layout
  if (isLayout) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavbarContent isOpen={isOpen} setIsOpen={setIsOpen} isActive={isActive} userRole={userRole} cartCount={cartCount} handleLogout={handleLogout} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    );
  }

  // Just navbar without layout (for backward compatibility)
  return (
    <NavbarContent isOpen={isOpen} setIsOpen={setIsOpen} isActive={isActive} userRole={userRole} cartCount={cartCount} handleLogout={handleLogout} />
  );
};

interface NavbarContentProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isActive: (path: string) => boolean;
  userRole: string | null;
  cartCount: number;
  handleLogout: () => void;
}

const NavbarContent = ({ isOpen, setIsOpen, isActive, userRole, cartCount, handleLogout }: NavbarContentProps) => {
  const { user } = useAuth();

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
            <div className="relative">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
              </Button>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            {user ? (
              <>
                <Button variant="default" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
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
              to="/cart" 
              className="block py-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart className="inline h-4 w-4 mr-2" />
              Cart
            </Link>
            {user ? (
              <>
                <Button 
                  variant="default" 
                  className="w-full gap-2 justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
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

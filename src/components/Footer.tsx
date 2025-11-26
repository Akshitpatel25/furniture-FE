import { Link } from "react-router-dom";
import { Home, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          
          {/* Brand */}
          <div className="flex flex-col items-center text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
              <Home className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">FurnitureHub</span>
            </Link>

            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Your trusted online furniture warehouse. Quality furniture
              for every room and style.
            </p>

            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">123 Furniture Street, NY 10001</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center text-center">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/products"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col items-center text-center">
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Get Help
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@furniturehub.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Email Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center text-center">
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>

            <div className="space-y-2 text-sm text-muted-foreground mt-2">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@furniturehub.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col items-center text-center gap-2">
          <p className="text-xs md:text-sm text-muted-foreground">
            © 2024 FurnitureHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
}

export const ProductCard = ({ id, name, price, image, category, rating = 4.5 }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-medium transition-all duration-300">
      <Link to={`/products/${id}`}>
        <div className="relative overflow-hidden aspect-square bg-secondary">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist logic
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{category}</p>
            <Link to={`/products/${id}`}>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {name}
              </h3>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-primary">${price}</span>
          <Button 
            size="sm" 
            variant="default"
            className="gap-2"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
}

export const ProductCard = ({ id, name, price, image, category, rating = 4.5 }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(id, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity} × ${name}`,
    });
    setQuantity(1);
    navigate('/cart');
  };

  return (
    <Card className="group overflow-hidden hover:shadow-medium transition-all duration-300">
      <Link to={`/products/${id}`}>
        <div className="relative overflow-hidden bg-secondary h-44 md:h-40">
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
        </div>

        <div className="flex items-center gap-2 mt-3">
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            title="Quantity"
            className="w-16 px-2 py-1 text-sm border border-border rounded bg-secondary"
          >
            {[1, 2, 3, 4, 5].map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
          <Button 
            size="sm" 
            variant="default"
            className="flex-1 gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

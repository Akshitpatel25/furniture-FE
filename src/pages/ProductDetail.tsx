import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api').replace('/api', '');

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await api.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart(product._id, quantity);
      toast({
        title: "Added to Cart",
        description: `${quantity} × ${product.product_name}`,
      });
      setQuantity(1);
      navigate('/cart');
    }
  };

  if (isLoading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error || !product) return <div className="container mx-auto px-4 py-8">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={product.product_image ? `${API_ORIGIN}${product.product_image}` : '/placeholder.jpg'}
            alt={product.product_name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{product.product_name}</h1>
          <p className="text-muted-foreground mb-4">{product.description}</p>
          <div className="text-2xl font-bold text-primary mb-4">${product.price}</div>
          <div className="mb-4">Stock: <strong>{product.stock}</strong></div>
          
          <div className="flex items-center gap-4 mt-6">
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              title="Quantity"
              className="px-4 py-2 border border-border rounded bg-secondary"
            >
              {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
            <Button size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import api from "@/lib/api";

type ApiProduct = {
  _id: string;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  product_image?: string | null;
};

export default function Products() {
  const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api').replace('/api', '');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', 'public'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data as ApiProduct[];
    },
  });

  const items = useMemo(() => (products ?? []).map((p) => ({
    id: p._id,
    name: p.product_name,
    price: p.price,
    image: p.product_image ? `${API_ORIGIN}${p.product_image}` : '/placeholder.jpg',
    category: '',
  })), [products, API_ORIGIN]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">All Products</h1>
        <p className="text-muted-foreground">Browse our complete collection of furniture</p>
      </div>

      <div className="flex-1">
        {isLoading ? (
          <p className="text-muted-foreground">Loading products...</p>
        ) : error ? (
          <p className="text-destructive">Failed to load products</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

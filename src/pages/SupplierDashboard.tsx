import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, TrendingUp, Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddProductForm } from "@/components/AddProductForm";
import { EditProductForm } from "@/components/EditProductForm";
import { DeleteProductConfirm } from "@/components/DeleteProductConfirm";
import api from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const stats = [
  { title: "Total Products", value: "45", change: "+3 this month", icon: Package },
  { title: "Revenue", value: "$12,345", change: "+15% this month", icon: DollarSign },
  { title: "Orders", value: "89", change: "+8 this week", icon: TrendingUp },
];

type Product = {
  _id: string;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  product_image?: string | null;
};

export default function SupplierDashboard() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api').replace('/api', '');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', 'supplier'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data;
    },
  });

  const handleDeleteSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['products', 'supplier'] });
    toast({ title: 'Deleted', description: 'Product deleted successfully' });
  };

  const handleEditSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['products', 'supplier'] });
    setEditingProduct(null);
    toast({ title: 'Updated', description: 'Product updated successfully' });
  };

  const handleAddSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['products', 'supplier'] });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Supplier Dashboard</h1>
          <p className="text-muted-foreground">Manage your products and track performance</p>
        </div>
        <Button className="gap-2" onClick={() => setIsAddProductOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <AddProductForm open={isAddProductOpen} onOpenChange={setIsAddProductOpen} onSuccess={handleAddSuccess} />
      {editingProduct && (
        <EditProductForm 
          product={editingProduct} 
          onClose={() => setEditingProduct(null)} 
          onSuccess={handleEditSuccess} 
        />
      )}
      {deletingProductId && (
        <DeleteProductConfirm
          productId={deletingProductId}
          onClose={() => setDeletingProductId(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-medium transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* My Products */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>My Products ({products?.length || 0})</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading products...</p>
          ) : error ? (
            <p className="text-destructive">Failed to load products</p>
          ) : products && products.length > 0 ? (
            <div className="space-y-4">
              {products.map((product: Product) => (
                <div key={product._id} className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition">
                  <div className="flex items-start gap-4 flex-1">
                    {product.product_image && (
                            <img
                              src={`http://localhost:5000${product.product_image}`}
                              alt={product.product_name}
                              className="w-20 h-20 object-cover rounded"
                              onError={(e) => { e.currentTarget.src = '/placeholder.jpg'; }}
                            />
                          )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.product_name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span>Price: <span className="font-medium text-primary">${product.price}</span></span>
                        <span>Stock: <span className="font-medium">{product.stock}</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingProduct(product)}
                      className="gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeletingProductId(product._id)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No products yet. Add one to get started!</p>
          )}
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 text-sm">#{2000 + i}</td>
                    <td className="py-3 px-4 text-sm">Modern Oak Chair</td>
                    <td className="py-3 px-4 text-sm">{i * 2}</td>
                    <td className="py-3 px-4 text-sm font-medium">${299 * i * 2}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-light text-accent-foreground">
                        Processing
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

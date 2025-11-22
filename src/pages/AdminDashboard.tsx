import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

type Stats = {
  totalSuppliers: number;
  totalCustomers: number;
  totalProducts: number;
  totalStockValue: number;
};

type Product = {
  _id: string;
  product_name: string;
  price: number;
  stock: number;
  supplier_id: {
    name: string;
    email: string;
  };
};

export default function AdminDashboard() {
  // Fetch stats
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const res = await api.get('/admin/stats');
      return res.data as Stats;
    },
  });

  // Fetch products
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['admin', 'products'],
    queryFn: async () => {
      const res = await api.get('/admin/products');
      return res.data.products as Product[];
    },
  });

  // Fetch suppliers list
  const { data: suppliersData, isLoading: suppliersLoading } = useQuery({
    queryKey: ['admin', 'suppliers'],
    queryFn: async () => {
      const res = await api.get('/admin/suppliers');
      return res.data.suppliers as { _id: string; name: string; email: string }[];
    },
  });

  // Fetch customers list
  const { data: customersData, isLoading: customersLoading } = useQuery({
    queryKey: ['admin', 'customers'],
    queryFn: async () => {
      const res = await api.get('/admin/customers');
      return res.data.customers as { _id: string; name: string; email: string }[];
    },
  });

  const stats = [
    { 
      title: "Total Suppliers", 
      value: statsData?.totalSuppliers ?? 0, 
      change: "+0%", 
      icon: Users, 
      color: "text-accent" 
    },
    { 
      title: "Total Products", 
      value: statsData?.totalProducts ?? 0, 
      change: "+0%", 
      icon: Package, 
      color: "text-highlight" 
    },
    { 
      title: "Total Users", 
      value: (statsData ? (statsData.totalSuppliers + statsData.totalCustomers) : 0), 
      change: "+0%", 
      icon: Users, 
      color: "text-accent" 
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-medium transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-accent flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats Summary */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Stats Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                <div>
                  <p className="text-sm font-medium">Total Suppliers</p>
                  <p className="text-xs text-muted-foreground">{statsData?.totalSuppliers || 0} active</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="text-sm font-medium">Total Customers</p>
                  <p className="text-xs text-muted-foreground">{statsData?.totalCustomers || 0} registered</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-highlight mt-2" />
                <div>
                  <p className="text-sm font-medium">Total Products</p>
                  <p className="text-xs text-muted-foreground">{statsData?.totalProducts || 0} listed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suppliers List */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          {suppliersLoading ? (
            <p className="text-muted-foreground">Loading suppliers...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliersData?.map((s) => (
                    <tr key={s._id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4 text-sm">{s.name}</td>
                      <td className="py-3 px-4 text-sm">{s.email}</td>
                      <td className="py-3 px-4 text-sm">
                        <Button variant="outline" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customers List */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Customers</CardTitle>
        </CardHeader>
        <CardContent>
          {customersLoading ? (
            <p className="text-muted-foreground">Loading customers...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customersData?.map((c) => (
                    <tr key={c._id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4 text-sm">{c.name}</td>
                      <td className="py-3 px-4 text-sm">{c.email}</td>
                      <td className="py-3 px-4 text-sm">
                        <Button variant="outline" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          {productsLoading ? (
            <p className="text-muted-foreground">Loading products...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Supplier</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Stock</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {productsData?.slice(0, 5).map((product) => (
                    <tr key={product._id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4 text-sm">{product.product_name}</td>
                      <td className="py-3 px-4 text-sm">{product.supplier_id.name}</td>
                      <td className="py-3 px-4 text-sm font-medium">${product.price}</td>
                      <td className="py-3 px-4 text-sm">{product.stock}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.stock > 0 
                            ? 'bg-accent-light text-accent-foreground' 
                            : 'bg-destructive/20 text-destructive'
                        }`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

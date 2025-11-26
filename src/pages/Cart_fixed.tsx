import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { Trash2, ArrowLeft } from "lucide-react";
import api from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from "@/hooks/use-toast";

type Product = {
  _id: string;
  product_name: string;
  price: number;
  product_image?: string | null;
};

export default function Cart() {
  const { items, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api').replace('/api', '');
  const [isLoading, setIsLoading] = useState(false);

  const { data: products } = useQuery({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      const res = await api.get('/products');
      return res.data as Product[];
    },
  });

  const cartDetails = useMemo(() => {
    if (!products) return [];
    return items.map((item) => {
      const product = products.find((p) => p._id === item.product_id);
      return {
        ...item,
        product: product || null,
      };
    });
  }, [items, products]);

  const subtotal = useMemo(
    () => cartDetails.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0),
    [cartDetails]
  );

  const [open, setOpen] = useState(false);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      await api.post('/cart/checkout');
      toast({ title: 'Success', description: 'Order placed successfully!' });
      clearCart();
      setOpen(false);
      navigate('/');
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error.response?.data?.message || 'Checkout failed', 
        variant: 'destructive' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some furniture to get started!</p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild>
          <Link to="/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Items ({items.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartDetails.map((item) => (
                <div key={item.product_id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                  {item.product?.product_image && (
                    <img
                      src={`${API_ORIGIN}${item.product.product_image}`}
                      alt={item.product.product_name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.product?.product_name || 'Unknown Product'}</h3>
                    <p className="text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="font-bold text-primary mt-2">
                      ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4" onClick={clearCart}>
                Clear Cart
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invoice</DialogTitle>
                    <p className="text-sm text-muted-foreground">Thank you for your purchase</p>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="mb-2 text-sm">Date: {new Date().toLocaleString()}</div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between font-medium border-b pb-2 mb-2">
                        <span>Item</span>
                        <span>Qty</span>
                        <span>Price</span>
                        <span>Total</span>
                      </div>
                      {cartDetails.map((item) => (
                        <div key={item.product_id} className="flex justify-between text-sm py-2 border-b last:border-0">
                          <div className="w-1/2">{item.product?.product_name || 'Unknown'}</div>
                          <div className="w-1/6 text-center">{item.quantity}</div>
                          <div className="w-1/6 text-right">${(item.product?.price || 0).toFixed(2)}</div>
                          <div className="w-1/6 text-right">${(((item.product?.price || 0) * item.quantity)).toFixed(2)}</div>
                        </div>
                      ))}
                      <div className="pt-3">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tax (10%)</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold mt-2">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleCheckout} disabled={isLoading}>{isLoading ? 'Processing...' : 'Place Order'}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg" onClick={() => setOpen(true)}>
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

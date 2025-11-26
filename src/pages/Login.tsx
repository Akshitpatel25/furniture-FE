import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import api from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');
    
    if (!email || !password) {
      toast({ title: 'Validation', description: 'Email and password required' });
      return;
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, id, name, email: returnedEmail, role } = res.data;
      login({ token, id, name, email: returnedEmail, role });
      toast({ title: 'Signed in', description: 'Welcome back' });
    } catch (err: unknown) {
      console.error(err);
      const errObj = err as { response?: { data?: { message?: string } }; message?: string };
      const message = errObj?.response?.data?.message ?? errObj?.message ?? 'Unable to sign in';
      toast({ title: 'Login failed', description: message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <Home className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">FurnitureHub</span>
        </Link>

        <Card className="shadow-large">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full">Sign In</Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>



              <p className="text-center text-sm text-muted-foreground">
                Don't have an account? <Link to="/register" className="text-primary hover:underline font-medium">Sign up</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

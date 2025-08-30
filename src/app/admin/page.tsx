'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AddProjectForm } from './add-project-form';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login failed', error);
      toast({
        title: 'Login Failed',
        description: 'Please check your email and password.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'rgb(56 189 248)', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'rgb(217 70 239)', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path
                fill="url(#logoGradient)"
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1.13 15.3l-3.32-3.32a.75.75 0 0 1 1.06-1.06l2.79 2.79l6.22-6.22a.75.75 0 0 1 1.06 1.06z"
              />
            </svg>
             <CardTitle className="text-2xl text-gradient">AsodTech Admin</CardTitle>
          </div>
          <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner /> : <><LogIn className="mr-2 h-4 w-4" /> Sign In</>}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminPanel() {
  const { user } = useAuth();
  
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
           <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'rgb(56 189 248)', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'rgb(217 70 239)', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path
                fill="url(#logoGradient)"
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1.13 15.3l-3.32-3.32a.75.75 0 0 1 1.06-1.06l2.79 2.79l6.22-6.22a.75.75 0 0 1 1.06 1.06z"
              />
            </svg>
          <span className="font-semibold text-gradient">AsodTech</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:inline">{user?.email}</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      <main className="p-4 md:p-8">
        <AddProjectForm />
      </main>
    </div>
  );
}


export default function AdminPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return user ? <AdminPanel /> : <LoginForm />;
}

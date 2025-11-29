"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { Home, ArrowLeft } from 'lucide-react';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();
  const { setUser, setTier, setEntitlements } = useAuthStore();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && !agreedToTerms) {
      alert("You must agree to the terms and conditions to create an account.");
      return;
    }

    setIsLoading(true);

    try {
      // Check if we're using placeholder Supabase credentials
      const isDemoMode = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder') ||
                        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.includes('placeholder');

      if (isDemoMode) {
        // Demo mode - simulate authentication
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

        // Mock user object that matches Supabase User type
        const mockUser = {
          id: 'demo-user-' + Date.now(),
          app_metadata: {},
          user_metadata: { name: email.split('@')[0] },
          aud: 'authenticated',
          confirmation_sent_at: new Date().toISOString(),
          recovery_sent_at: undefined,
          email_change_sent_at: undefined,
          new_email: undefined,
          new_confirmation_sent_at: undefined,
          invited_at: undefined,
          action_link: undefined,
          email: email,
          phone: undefined,
          created_at: new Date().toISOString(),
          confirmed_at: new Date().toISOString(),
          email_confirmed_at: new Date().toISOString(),
          phone_confirmed_at: undefined,
          last_sign_in_at: new Date().toISOString(),
          role: 'authenticated' as const,
          updated_at: new Date().toISOString(),
          identities: [],
          factors: [],
        };

        // Mock tier and entitlements based on email for demo
        let tier = 'free';
        let entitlements: Record<string, boolean> = {};

        if (email === 'creator@slate360.com') {
          tier = 'creator';
          entitlements = {
            'project-hub': true,
            'design-studio': true,
            'content-studio': true,
            '360-tour-builder': true,
            'geospatial-robotics': false,
            'virtual-studio': false,
            'analytics-reports': false,
            'athlete360': false,
          };
        } else if (email === 'modeling@slate360.com') {
          tier = 'modeling';
          entitlements = {
            'project-hub': true,
            'design-studio': true,
            'content-studio': true,
            '360-tour-builder': true,
            'geospatial-robotics': true,
            'virtual-studio': false,
            'analytics-reports': true,
            'athlete360': false,
          };
        } else if (email === 'godmode@slate360.com') {
          tier = 'godmode';
          entitlements = {
            'project-hub': true,
            'design-studio': true,
            'content-studio': true,
            '360-tour-builder': true,
            'geospatial-robotics': true,
            'virtual-studio': true,
            'analytics-reports': true,
            'athlete360': true,
          };
        } else if (email === 'ceo@slate360.com') {
          tier = 'enterprise';
          entitlements = {
            'project-hub': true,
            'design-studio': true,
            'content-studio': true,
            '360-tour-builder': true,
            'geospatial-robotics': true,
            'virtual-studio': true,
            'analytics-reports': true,
            'athlete360': true,
          };
        } else {
          // Default to creator tier for demo
          tier = 'creator';
          entitlements = {
            'project-hub': true,
            'design-studio': true,
            'content-studio': true,
            '360-tour-builder': true,
            'geospatial-robotics': false,
            'virtual-studio': false,
            'analytics-reports': false,
            'athlete360': false,
          };
        }

        setUser(mockUser);
        setTier(tier);
        setEntitlements(entitlements);
        
        // Force navigation
        window.location.href = '/dashboard';
        return;
      }

      // Real Supabase authentication
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Check your email for confirmation!');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        // Mock tier and entitlements based on email for demo
        let tier = 'free';
        let entitlements: Record<string, boolean> = {};

        if (email === 'creator@slate360.com') {
          tier = 'creator';
          entitlements = {
            'project-hub': true,
            'design-studio': true,
            'content-studio': true,
            '360-tour-builder': true,
            'geospatial-robotics': false,
            'virtual-studio': false,
            'analytics-reports': false,
            'athlete360': false,
          };
        } else if (email === 'modeling@slate360.com') {
          tier = 'modeling';
          entitlements = {
            'project-hub': true,
            'design-studio': true,
            'content-studio': true,
            '360-tour-builder': true,
            'geospatial-robotics': true,
            'virtual-studio': false,
            'analytics-reports': true,
            'athlete360': false,
          };
        } else if (email === 'godmode@slate360.com') {
          tier = 'godmode';
          entitlements = {
            'project-hub': true,
            'design-studio': true,
            'content-studio': true,
            '360-tour-builder': true,
            'geospatial-robotics': true,
            'virtual-studio': true,
            'analytics-reports': true,
            'athlete360': true,
          };
        } else if (email === 'ceo@slate360.com') {
          tier = 'enterprise';
          entitlements = {
            'project-hub': true,
            'design-studio': true,
            'content-studio': true,
            '360-tour-builder': true,
            'geospatial-robotics': true,
            'virtual-studio': true,
            'analytics-reports': true,
            'athlete360': true,
          };
        } else {
          // Default to creator tier for demo
          tier = 'creator';
          entitlements = {
            'project-hub': true,
            'design-studio': true,
            'content-studio': true,
            '360-tour-builder': true,
            'geospatial-robotics': false,
            'virtual-studio': false,
            'analytics-reports': false,
            'athlete360': false,
          };
        }

        setUser(data.user);
        setTier(tier);
        setEntitlements(entitlements);
        router.push('/dashboard');
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-slate-950 to-slate-950 opacity-50 z-0"></div>
      
      {/* Navigation Buttons */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <Button variant="ghost" className="text-slate-400 hover:text-slate-50 flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
        </Link>
      </div>
      
      <div className="absolute top-6 right-6 z-20">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-50">
            <Home className="h-6 w-6" />
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md z-10 backdrop-blur-md bg-slate-800/50 border-slate-700/50 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-50 to-slate-300 bg-clip-text text-transparent">
            Welcome to Slate360
          </CardTitle>
          <CardDescription className="text-slate-400">
            {isSignUp ? 'Create your account' : 'Sign in to access your dashboard'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-700/50 border-slate-600/50 focus:ring-cyan-500 text-slate-50 placeholder-slate-400"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-700/50 border-slate-600/50 focus:ring-cyan-500 text-slate-50 placeholder-slate-400"
              />
            </div>
            
            {isSignUp && (
              <div className="flex items-start gap-2 mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 bg-slate-700"
                />
                <label htmlFor="terms" className="text-xs text-slate-400">
                  I agree to the <Link href="/terms" className="text-cyan-400 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>. Data rates may apply.
                </label>
              </div>
            )}

            <Button type="submit" className="w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20" disabled={isLoading}>
              {isLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="text-slate-400 hover:text-cyan-400">
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </Button>
          </div>
          <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
            <p className="text-sm font-medium text-slate-50 mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs text-slate-400">
              <p><strong className="text-cyan-400">Creator:</strong> creator@slate360.com</p>
              <p><strong className="text-cyan-400">Modeling:</strong> modeling@slate360.com</p>
              <p><strong className="text-cyan-400">God Mode:</strong> godmode@slate360.com</p>
              <p><strong className="text-cyan-400">CEO:</strong> ceo@slate360.com</p>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 italic">Any password works for demo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
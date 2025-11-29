"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const { setUser, setTier, setEntitlements } = useAuthStore();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
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
        router.push('/dashboard');
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to Slate360</CardTitle>
          <CardDescription>
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
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </Button>
          </div>
          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Creator:</strong> creator@slate360.com</p>
              <p><strong>Modeling:</strong> modeling@slate360.com</p>
              <p><strong>God Mode:</strong> godmode@slate360.com</p>
              <p><strong>CEO:</strong> ceo@slate360.com</p>
            </div>
            <p className="text-xs text-slate-500 mt-2">Any password works for demo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
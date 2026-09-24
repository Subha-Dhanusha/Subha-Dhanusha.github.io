'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { sound } from '@/lib/utils/sound';

interface AdminUser {
  email: string;
  role: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local session or Supabase session
    const checkSession = async () => {
      try {
        if (isSupabaseConfigured()) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.email) {
            setUser({
              email: session.user.email,
              role: 'Super Admin',
            });
            setIsLoading(false);
            return;
          }
        }

        // Fallback local session
        const localSession = localStorage.getItem('portfolio_admin_token');
        if (localSession) {
          try {
            const parsed = JSON.parse(localSession);
            if (parsed.email && parsed.exp > Date.now()) {
              setUser({ email: parsed.email, role: 'Super Admin' });
            } else {
              localStorage.removeItem('portfolio_admin_token');
            }
          } catch (e) {
            localStorage.removeItem('portfolio_admin_token');
          }
        }
      } catch (err) {
        console.error('Error checking auth session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // 1. Try Supabase Auth if online
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (!error && data.user?.email) {
          setUser({ email: data.user.email, role: 'Super Admin' });
          sound.success();
          setIsLoading(false);
          return { success: true };
        }
      } catch (err) {
        console.warn('Supabase auth attempt failed, testing fallback...', err);
      }
    }

    // 2. Call our secure server-side auth route `/api/auth/login`
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setUser({ email: json.email || email, role: 'Super Admin' });
        localStorage.setItem(
          'portfolio_admin_token',
          JSON.stringify({
            email,
            token: json.token,
            exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
          })
        );
        sound.success();
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: json.error || 'Invalid credentials' };
      }
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Authentication failed' };
    }
  };

  const logout = async () => {
    sound.click();
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
    localStorage.removeItem('portfolio_admin_token');
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

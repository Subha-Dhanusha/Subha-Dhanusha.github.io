'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Shield, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await login(email, password);
    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.error || 'Invalid admin credentials');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040d1a] flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
      
      {/* Subtle Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl space-y-8 z-10">
        
        {/* Brand Header */}
        <div className="space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-cyan-500/30">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Admin Portal
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Subha Dhanusha — Portfolio CMS &amp; Data Control
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl border border-red-500/40 bg-red-500/10 text-red-300 text-xs font-mono flex items-start gap-2">
            <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-400 block">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@subha.dev"
                className="w-full px-4 py-3 pl-10 rounded-xl border border-white/10 bg-slate-800/60 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-400 block">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 pl-10 rounded-xl border border-white/10 bg-slate-800/60 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 text-center">
          <Link
            href="/"
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            ← Return to Public Portfolio
          </Link>
        </div>

      </div>
    </div>
  );
}

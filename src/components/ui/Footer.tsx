'use client';

import React from 'react';
import { useDomain } from '@/context/DomainContext';
import { ArrowUp, Heart, Shield, Sparkles } from 'lucide-react';
import { sound } from '@/lib/utils/sound';
import Link from 'next/link';

export default function Footer() {
  const { currentDomain, activeTheme, setDomain } = useDomain();

  const scrollToTop = () => {
    sound.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-surface-border bg-surface/30 backdrop-blur-md py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs"
                style={{ backgroundColor: activeTheme.primary }}
              >
                SD
              </div>
              <span className="text-lg font-extrabold text-foreground tracking-tight">
                Subha Dhanusha P
              </span>
            </div>
            <p className="text-xs font-mono text-foreground-muted max-w-md">
              AI × Data × Software Engineering Portfolio. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.
            </p>
          </div>

          {/* Quick Domain Switcher Footer Links */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-foreground-muted mr-1">DOMAINS:</span>
            {[
              { id: 'ai-ml', label: 'AI/ML' },
              { id: 'data-engineering', label: 'Data Eng' },
              { id: 'data-analytics', label: 'Analytics' },
              { id: 'software', label: 'Software' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDomain(d.id as any)}
                className={`px-2.5 py-1 rounded-md border text-[11px] transition-colors ${
                  currentDomain === d.id
                    ? 'border-accent text-foreground font-bold'
                    : 'border-surface-border text-foreground-muted hover:text-foreground'
                }`}
                style={{
                  borderColor: currentDomain === d.id ? activeTheme.primary : undefined,
                  color: currentDomain === d.id ? activeTheme.primary : undefined,
                }}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.tick()}
            className="flex items-center gap-2 p-3 rounded-xl border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground text-xs font-mono transition-colors self-start md:self-auto"
          >
            <span>Back to top</span>
            <ArrowUp size={14} style={{ color: activeTheme.primary }} />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-surface-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-foreground-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Systems Online • Supabase DB Connected • Kovilpatti, India</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Shield size={12} style={{ color: activeTheme.primary }} />
              <span>Admin Portal</span>
            </Link>
            <span>© {new Date().getFullYear()} Subha Dhanusha P.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Sparkles, Database } from 'lucide-react';
import { sound } from '@/lib/utils/sound';

interface AdminHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export default function AdminHeader({ title, description, actions }: AdminHeaderProps) {
  return (
    <header className="p-6 sm:p-8 border-b border-surface-border bg-surface/40 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm font-mono text-foreground-muted mt-1">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {actions}
        
        <Link
          href="/"
          target="_blank"
          onClick={() => sound.click()}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-mono font-semibold border border-surface-border hover:bg-surface text-foreground transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink size={14} />
        </Link>
      </div>
    </header>
  );
}

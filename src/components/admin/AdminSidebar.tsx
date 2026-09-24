'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  User,
  FolderGit2,
  Briefcase,
  Cpu,
  GraduationCap,
  Award,
  Trophy,
  FileText,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { sound } from '@/lib/utils/sound';

interface SidebarProps {
  unreadMessagesCount?: number;
}

export default function AdminSidebar({ unreadMessagesCount = 0 }: SidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAdminAuth();

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Domains', href: '/admin/domains', icon: Layers },
    { label: 'Hero Sections', href: '/admin/hero', icon: Sparkles },
    { label: 'About Sections', href: '/admin/about', icon: User },
    { label: 'Projects & Case Studies', href: '/admin/projects', icon: FolderGit2 },
    { label: 'Experience', href: '/admin/experience', icon: Briefcase },
    { label: 'Skills & Tech', href: '/admin/skills', icon: Cpu },
    { label: 'Education', href: '/admin/education', icon: GraduationCap },
    { label: 'Certifications', href: '/admin/certifications', icon: Award },
    { label: 'Achievements', href: '/admin/achievements', icon: Trophy },
    { label: 'Resumes', href: '/admin/resumes', icon: FileText },
    { label: 'Messages', href: '/admin/messages', icon: Mail, badge: unreadMessagesCount },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-surface-border bg-surface/80 backdrop-blur-xl flex flex-col justify-between h-screen sticky top-0 overflow-y-auto">
      <div className="p-5 space-y-6">
        
        {/* Brand */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
              SD
            </div>
            <div>
              <div className="text-sm font-extrabold text-foreground tracking-tight">
                Subha Dhanusha
              </div>
              <div className="text-xs font-mono text-cyan-400 uppercase">
                Admin CMS Portal
              </div>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            onClick={() => sound.click()}
            title="View Live Portfolio"
            className="p-1.5 rounded-lg border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground transition-colors"
          >
            <ExternalLink size={14} />
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => sound.tick()}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-mono font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-500 text-white font-bold shadow-md'
                    : 'text-foreground-muted hover:text-foreground hover:bg-surface'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive ? 'bg-white text-cyan-600' : 'bg-cyan-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Session Footer */}
      <div className="p-4 border-t border-surface-border bg-surface/40 flex items-center justify-between">
        <div className="flex flex-col min-w-0 pr-2">
          <span className="text-sm font-bold text-foreground truncate">
            {user?.email || 'admin@subha.dev'}
          </span>
          <span className="text-xs font-mono text-emerald-400">
            Authenticated Admin
          </span>
        </div>
        <button
          onClick={() => logout()}
          title="Sign Out"
          className="p-2 rounded-lg border border-surface-border hover:bg-red-500/10 hover:border-red-500/40 text-foreground-muted hover:text-red-400 transition-colors"
        >
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}

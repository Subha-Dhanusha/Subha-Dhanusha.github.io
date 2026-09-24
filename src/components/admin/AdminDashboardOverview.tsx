'use client';

import React from 'react';
import Link from 'next/link';
import { FullPortfolioData, ContactMessage } from '@/types/portfolio';
import {
  FolderGit2,
  Briefcase,
  Cpu,
  Award,
  Mail,
  Layers,
  ArrowRight,
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { sound } from '@/lib/utils/sound';

interface OverviewProps {
  data: FullPortfolioData;
  messages: ContactMessage[];
}

export default function AdminDashboardOverview({ data, messages }: OverviewProps) {
  const unreadMessages = messages.filter(m => !m.is_read).length;

  const statCards = [
    { label: 'Domains Configured', val: data.domains.length, icon: Layers, href: '/admin/domains', color: '#06b6d4' },
    { label: 'Engineering Projects', val: data.projects.length, icon: FolderGit2, href: '/admin/projects', color: '#8b5cf6' },
    { label: 'Work Experiences', val: data.experiences.length, icon: Briefcase, href: '/admin/experience', color: '#f59e0b' },
    { label: 'Technical Skills', val: data.skills.length, icon: Cpu, href: '/admin/skills', color: '#10b981' },
    { label: 'Certifications', val: data.certifications.length, icon: Award, href: '/admin/certifications', color: '#3b82f6' },
    { label: 'Inquiries Received', val: messages.length, badge: unreadMessages > 0 ? `${unreadMessages} new` : undefined, icon: Mail, href: '/admin/messages', color: '#ec4899' },
  ];

  return (
    <div className="p-6 sm:p-8 space-y-10">
      
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              onClick={() => sound.click()}
              className="p-5 rounded-2xl border border-surface-border bg-surface/50 hover:bg-surface/80 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="p-2 rounded-xl text-white"
                  style={{ backgroundColor: card.color }}
                >
                  <Icon size={16} />
                </span>
                {card.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 font-bold">
                    {card.badge}
                  </span>
                )}
              </div>
              <div>
                <div className="text-2xl font-extrabold font-mono text-foreground">
                  {card.val}
                </div>
                <div className="text-xs font-mono text-foreground-muted mt-1 truncate">
                  {card.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 4 Professional Domains Status Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Professional Identities Status
            </h2>
            <p className="text-xs font-mono text-foreground-muted">
              Content, hero configurations, and tailored resumes for each lens.
            </p>
          </div>
          <Link
            href="/admin/domains"
            onClick={() => sound.click()}
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Manage All Domains</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.domains.map((dom) => {
            const hero = data.heroSections[dom.id];
            const resume = data.resumes[dom.id];
            return (
              <div
                key={dom.id}
                className="p-5 rounded-2xl border border-surface-border bg-surface/40 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold"
                      style={{
                        backgroundColor: `${dom.accent_color}20`,
                        color: dom.accent_color,
                        border: `1px solid ${dom.accent_color}40`,
                      }}
                    >
                      {dom.theme_code}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 size={11} /> Published
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-foreground">
                    {dom.name}
                  </h3>
                  <p className="text-xs font-mono text-foreground-muted truncate">
                    {dom.role_title}
                  </p>
                </div>

                <div className="text-[11px] font-mono space-y-1.5 pt-3 border-t border-surface-border/60 text-foreground-muted">
                  <div className="truncate">
                    <strong>Resume:</strong> {resume ? resume.file_name : 'Default'}
                  </div>
                  <div>
                    <strong>Hero CTA:</strong> {hero?.primary_cta_label || 'Default'}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Link
                    href={`/admin/hero`}
                    onClick={() => sound.click()}
                    className="flex-1 py-1.5 rounded-lg border border-surface-border text-center text-[11px] font-mono hover:bg-surface text-foreground"
                  >
                    Edit Hero
                  </Link>
                  <Link
                    href={`/admin/resumes`}
                    onClick={() => sound.click()}
                    className="flex-1 py-1.5 rounded-lg border border-surface-border text-center text-[11px] font-mono hover:bg-surface text-foreground"
                  >
                    Resume
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Contact Submissions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Recent Inquiries &amp; Recruiter Messages
            </h2>
            <p className="text-xs font-mono text-foreground-muted">
              Incoming contact form submissions stored in database.
            </p>
          </div>
          <Link
            href="/admin/messages"
            onClick={() => sound.click()}
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View All Messages</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="space-y-3">
          {messages.slice(0, 3).map((msg) => (
            <div
              key={msg.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                !msg.is_read
                  ? 'border-cyan-500/40 bg-surface/70'
                  : 'border-surface-border bg-surface/30'
              } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">
                    {msg.name}
                  </span>
                  <span className="text-xs font-mono text-foreground-muted">
                    &lt;{msg.email}&gt;
                  </span>
                  {!msg.is_read && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500 text-white font-bold">
                      UNREAD
                    </span>
                  )}
                </div>
                <div className="text-xs font-medium text-foreground">
                  {msg.subject}
                </div>
                <p className="text-xs text-foreground-muted line-clamp-1">
                  {msg.message}
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                <span className="text-[11px] font-mono text-foreground-muted flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-surface-border text-foreground-muted uppercase">
                  Context: {msg.domain_context || 'general'}
                </span>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="p-8 text-center rounded-2xl border border-surface-border text-xs font-mono text-foreground-muted">
              No messages received yet.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

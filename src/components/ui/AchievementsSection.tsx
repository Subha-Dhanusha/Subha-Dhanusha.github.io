'use client';

import React from 'react';
import { Achievement } from '@/types/portfolio';
import { useDomain } from '@/context/DomainContext';
import { Trophy, Users, Star, Medal } from 'lucide-react';

interface AchievementsProps {
  achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: AchievementsProps) {
  const { currentDomain, activeTheme } = useDomain();

  const getIcon = (category?: string) => {
    switch (category) {
      case 'Technical Contest': return <Trophy size={18} />;
      case 'Academic Award': return <Medal size={18} />;
      case 'Leadership': return <Users size={18} />;
      default: return <Star size={18} />;
    }
  };

  return (
    <section id="achievements" className="relative py-24 border-t border-surface-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground-muted">
            <Trophy size={14} style={{ color: activeTheme.primary }} />
            <span>07 // AWARDS &amp; LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Achievements &amp; Student Leadership
          </h2>
          <p className="text-base text-foreground-muted max-w-2xl">
            Proven track record of technical competence under pressure, peer leadership, and consistent academic merit.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-6 sm:p-7 rounded-3xl border border-surface-border bg-surface/50 backdrop-blur-md shadow-lg flex items-start gap-4 transition-all duration-200 hover:border-accent"
              style={{
                borderColor: ach.domain_ids?.includes(currentDomain) ? `${activeTheme.primary}40` : undefined,
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  backgroundColor: `${activeTheme.primary}15`,
                  color: activeTheme.primary,
                  border: `1px solid ${activeTheme.primary}30`,
                }}
              >
                {getIcon(ach.category)}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase text-foreground-muted">
                    {ach.organization || 'RIT / Anna University'}
                  </span>
                  {ach.date && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-surface-border text-foreground-muted">
                      {ach.date}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  {ach.title}
                </h3>

                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

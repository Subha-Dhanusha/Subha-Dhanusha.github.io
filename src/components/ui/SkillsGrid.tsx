'use client';

import React, { useState } from 'react';
import { Skill } from '@/types/portfolio';
import { useDomain } from '@/context/DomainContext';
import { Cpu, Check, Filter } from 'lucide-react';
import { sound } from '@/lib/utils/sound';

interface SkillsProps {
  skills: Skill[];
}

export default function SkillsGrid({ skills }: SkillsProps) {
  const { currentDomain, activeTheme } = useDomain();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Machine Learning', 'Data Engineering', 'Data Analytics', 'Programming', 'Databases', 'Cloud', 'Web', 'Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="relative py-24 border-t border-surface-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground-muted">
            <Cpu size={14} style={{ color: activeTheme.primary }} />
            <span>04 // TECHNICAL COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Skills &amp; Technology Stack
          </h2>
          <p className="text-base text-foreground-muted max-w-2xl">
            Proficiencies across algorithmic modeling, pipeline infrastructure, database architectures, and production application development.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.tick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'text-white border-transparent shadow-md'
                  : 'text-foreground-muted border-surface-border bg-surface/40 hover:text-foreground hover:bg-surface'
              }`}
              style={{
                backgroundColor: selectedCategory === cat ? activeTheme.primary : undefined,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => {
            const isDomainPriority = skill.domain_ids?.includes(currentDomain);
            return (
              <div
                key={skill.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isDomainPriority
                    ? 'border-surface-border bg-surface/70 shadow-sm'
                    : 'border-surface-border/50 bg-surface/30'
                }`}
                style={{
                  borderColor: isDomainPriority ? `${activeTheme.primary}40` : undefined,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-foreground-muted uppercase">
                      {skill.category}
                    </span>
                    <span className="text-xs font-mono font-bold" style={{ color: activeTheme.primary }}>
                      {skill.proficiency}%
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-foreground">
                    {skill.name}
                  </h4>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-surface-border/80 overflow-hidden mt-4">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${skill.proficiency}%`,
                      backgroundColor: activeTheme.primary,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

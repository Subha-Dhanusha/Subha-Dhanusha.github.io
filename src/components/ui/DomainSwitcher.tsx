'use client';

import React from 'react';
import { useDomain } from '@/context/DomainContext';
import { DomainId } from '@/types/portfolio';
import { Brain, Database, BarChart3, Code2, Sparkles, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { sound } from '@/lib/utils/sound';

interface DomainOption {
  id: DomainId;
  label: string;
  sub: string;
  num: string;
  icon: React.ReactNode;
}

export default function DomainSwitcher() {
  const { currentDomain, setDomain, activeTheme, domains } = useDomain();

  const getDomainIcon = (id: string, themeCode: string) => {
    if (id === 'ai-ml' || themeCode === 'aiml') return <Brain size={16} />;
    if (id === 'data-engineering' || themeCode === 'de') return <Database size={16} />;
    if (id === 'data-analytics' || themeCode === 'da') return <BarChart3 size={16} />;
    if (id === 'software' || themeCode === 'se') return <Code2 size={16} />;
    return <Layers size={16} />;
  };

  const options: DomainOption[] = domains && domains.length > 0
    ? domains.filter(d => d.is_active !== false).map((d, index) => ({
        id: d.id,
        label: d.name.length > 18 ? d.name.slice(0, 16) + '..' : d.name,
        sub: d.role_title,
        num: String(index + 1).padStart(2, '0'),
        icon: getDomainIcon(d.id, d.theme_code),
      }))
    : [
        {
          id: 'ai-ml',
          label: 'AI / ML',
          sub: 'Machine Learning',
          num: '01',
          icon: <Brain size={16} />,
        },
        {
          id: 'data-engineering',
          label: 'DATA ENGINEERING',
          sub: 'Cloud & Pipelines',
          num: '02',
          icon: <Database size={16} />,
        },
        {
          id: 'data-analytics',
          label: 'DATA ANALYTICS',
          sub: 'Financial Valuation',
          num: '03',
          icon: <BarChart3 size={16} />,
        },
        {
          id: 'software',
          label: 'SOFTWARE + AI',
          sub: 'Full-Stack Systems',
          num: '04',
          icon: <Code2 size={16} />,
        },
      ];

  const currentOption = options.find(o => o.id === currentDomain) || options[0];

  return (
    <aside
      aria-label="Professional Domain Switcher"
      className="sticky top-20 z-30 w-full py-4 transition-all duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative p-1.5 rounded-2xl border border-surface-border bg-surface/70 backdrop-blur-xl shadow-2xl">
          {/* Header pill indicator */}
          <div className="hidden sm:flex items-center justify-between px-3 py-1 mb-1 text-xs font-mono text-foreground-muted">
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} style={{ color: activeTheme.primary }} />
              SELECT PROFESSIONAL LENS:
            </span>
            <span className="tracking-wider uppercase">
              Current Identity: <strong style={{ color: activeTheme.primary }}>{currentOption?.label}</strong>
            </span>
          </div>

          {/* Selector Grid */}
          <div className={`grid grid-cols-2 ${options.length <= 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3 md:grid-cols-' + Math.min(options.length, 5)} gap-1.5`}>
            {options.map((opt) => {
              const isActive = currentDomain === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setDomain(opt.id)}
                  onMouseEnter={() => sound.tick()}
                  className={`relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition-all duration-300 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-foreground-muted hover:text-foreground hover:bg-surface/50'
                  }`}
                >
                  {/* Active highlight background pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeDomainPill"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        backgroundColor: activeTheme.primary,
                        boxShadow: `0 0 20px ${activeTheme.glow}`,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}

                  {/* Icon & Details */}
                  <span className="relative z-10 flex items-center justify-center">
                    {opt.icon}
                  </span>

                  <div className="relative z-10 flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 leading-tight">
                      <span className={`text-xs font-mono font-bold opacity-80 ${isActive ? 'text-white/90' : 'text-foreground-muted'}`}>
                        {opt.num}
                      </span>
                      <span className="text-sm font-semibold tracking-tight truncate uppercase">
                        {opt.label}
                      </span>
                    </div>
                    <span className={`text-xs truncate hidden sm:inline ${isActive ? 'text-white/90' : 'text-foreground-muted/80'}`}>
                      {opt.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

'use client';

import React from 'react';
import { HeroSection, Profile } from '@/types/portfolio';
import { useDomain } from '@/context/DomainContext';
import { ArrowDown, Download, Sparkles, Terminal, ExternalLink, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/utils/sound';

interface HeroProps {
  hero: HeroSection;
  profile: Profile;
  resumeUrl: string;
}

export default function Hero({ hero, profile, resumeUrl }: HeroProps) {
  const { currentDomain, activeTheme, isSwitching } = useDomain();

  const getDomainTag = () => {
    switch (currentDomain) {
      case 'ai-ml': return 'AI & MACHINE LEARNING';
      case 'data-engineering': return 'CLOUD DATA ENGINEERING';
      case 'data-analytics': return 'FINANCIAL DATA ANALYTICS';
      case 'software': return 'FULL-STACK & SOFTWARE SYSTEMS';
    }
  };

  return (
    <section id="overview" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Hero Typography & Positioning */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Identity Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${currentDomain}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-medium backdrop-blur-md"
                style={{
                  borderColor: `${activeTheme.primary}40`,
                  backgroundColor: `${activeTheme.primary}12`,
                  color: activeTheme.primary,
                }}
              >
                <Sparkles size={13} className="animate-spin-slow" />
                <span>{hero.badge_text || `MODE // ${getDomainTag()}`}</span>
              </motion.div>
            </AnimatePresence>

            {/* Giant Editorial Name & Domain Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
                <span>{profile.full_name || 'Subha Dhanusha P'}</span>
              </h1>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`subheadline-${currentDomain}`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.35 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight"
                  style={{ color: activeTheme.primary }}
                >
                  {hero.subheadline}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Narrative Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentDomain}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-base sm:text-lg text-foreground-muted max-w-2xl leading-relaxed"
              >
                {hero.description}
              </motion.p>
            </AnimatePresence>

            {/* Location & Status Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-foreground-muted pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} style={{ color: activeTheme.primary }} />
                {profile.location || 'Kovilpatti, Tamil Nadu'}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Summer &amp; Graduate Roles
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href={hero.primary_cta_url || '#projects'}
                onClick={() => sound.click()}
                onMouseEnter={() => sound.tick()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg text-white"
                style={{
                  backgroundColor: activeTheme.primary,
                  boxShadow: `0 0 24px ${activeTheme.glow}`,
                }}
              >
                <span>{hero.primary_cta_label || 'Explore My Work'}</span>
                <ArrowDown size={16} />
              </a>

              <a
                href={resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                onMouseEnter={() => sound.tick()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm border border-surface-border text-foreground hover:bg-surface/60 transition-all duration-300"
              >
                <Download size={16} style={{ color: activeTheme.primary }} />
                <span>{hero.secondary_cta_label || 'Download Resume'}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Live Terminal Readout & Technical Architecture Telemetry */}
          <div className="lg:col-span-5 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`terminal-${currentDomain}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl border border-surface-border bg-surface/80 backdrop-blur-xl p-5 shadow-2xl overflow-hidden"
              >
                {/* Glow backdrop behind terminal */}
                <div
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{ backgroundColor: activeTheme.primary }}
                />

                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-border">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-foreground-muted flex items-center gap-1.5">
                      <Terminal size={12} />
                      lens://{currentDomain}.telemetry
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded border"
                    style={{
                      color: activeTheme.primary,
                      borderColor: `${activeTheme.primary}40`,
                    }}
                  >
                    LIVE
                  </span>
                </div>

                {/* Terminal Readout Lines */}
                <div className="space-y-3 font-mono text-xs">
                  {hero.terminal_lines && hero.terminal_lines.length > 0 ? (
                    hero.terminal_lines.map((line, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-foreground-muted select-none">&gt;</span>
                        <span className="text-foreground-muted uppercase font-bold text-[11px] min-w-[90px]">
                          [{line.label}]:
                        </span>
                        <span className="text-foreground flex-1 break-words">
                          {line.val}
                        </span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-start gap-2">
                        <span className="text-foreground-muted select-none">&gt;</span>
                        <span className="text-foreground-muted font-bold min-w-[90px]">[SYSTEM]:</span>
                        <span className="text-foreground">Anna University / RIT AI &amp; DS Dept</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-foreground-muted select-none">&gt;</span>
                        <span className="text-foreground-muted font-bold min-w-[90px]">[CGPA]:</span>
                        <span className="text-foreground">8.28 / 10.0 (3x Department Topper)</span>
                      </div>
                    </>
                  )}

                  {/* Interactive Status Footer inside terminal */}
                  <div className="pt-3 mt-3 border-t border-surface-border/60 flex items-center justify-between text-[11px] text-foreground-muted">
                    <span>Active Profile Hash: 0x828..AnnaUniv</span>
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                      style={{ color: activeTheme.primary }}
                    >
                      <span>github.com</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

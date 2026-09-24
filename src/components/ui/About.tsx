'use client';

import React from 'react';
import { AboutSection, Profile } from '@/types/portfolio';
import { useDomain } from '@/context/DomainContext';
import { CheckCircle2, Award, Zap, BookOpen, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutProps {
  about: AboutSection;
  profile: Profile;
}

export default function About({ about, profile }: AboutProps) {
  const { currentDomain, activeTheme } = useDomain();

  return (
    <section id="about" className="relative py-24 border-t border-surface-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground-muted">
            <Compass size={14} style={{ color: activeTheme.primary }} />
            <span>01 // PROFESSIONAL POSITIONING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Engineering Identity &amp; Perspective
          </h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={`about-sub-${currentDomain}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-medium max-w-3xl"
              style={{ color: activeTheme.primary }}
            >
              {about.role_subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Narrative & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Biography & Highlights */}
          <div className="lg:col-span-7 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`about-bio-${currentDomain}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="prose prose-invert max-w-none text-foreground-muted leading-relaxed text-base sm:text-lg"
              >
                <p>{about.bio}</p>
              </motion.div>
            </AnimatePresence>

            {/* Highlights List */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold flex items-center gap-2">
                <Zap size={14} style={{ color: activeTheme.primary }} />
                <span>Domain Accomplishments</span>
              </h3>
              <div className="space-y-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`about-hl-${currentDomain}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    {about.highlights?.map((hl, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl border border-surface-border bg-surface/40 hover:bg-surface/70 transition-all duration-200"
                      >
                        <CheckCircle2
                          size={18}
                          className="shrink-0 mt-0.5"
                          style={{ color: activeTheme.primary }}
                        />
                        <span className="text-sm text-foreground leading-snug">
                          {hl}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Focus Areas & Metrics */}
          <div className="lg:col-span-5 space-y-6">

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {about.stats?.map((stat, idx) => (
                  <motion.div
                    key={`stat-${currentDomain}-${idx}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    className="p-5 rounded-2xl border border-surface-border bg-surface/60 backdrop-blur-md flex flex-col justify-between"
                  >
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground" style={{ color: activeTheme.primary }}>
                      {stat.val}
                    </span>
                    <span className="text-xs font-mono text-foreground-muted uppercase tracking-wider mt-2">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Focus Pillars */}
            <div className="p-6 rounded-2xl border border-surface-border bg-surface/40 backdrop-blur-md space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold flex items-center gap-2">
                <BookOpen size={14} style={{ color: activeTheme.primary }} />
                <span>Specialization Pillars</span>
              </h3>

              <div className="space-y-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`focus-${currentDomain}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    {about.focus_areas?.map((fa, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-surface-border/60 bg-surface/50">
                        <div className="text-sm font-semibold text-foreground flex items-center justify-between">
                          <span>{fa.title}</span>
                          <span className="text-[10px] font-mono" style={{ color: activeTheme.primary }}>0{idx + 1}</span>
                        </div>
                        <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                          {fa.desc}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

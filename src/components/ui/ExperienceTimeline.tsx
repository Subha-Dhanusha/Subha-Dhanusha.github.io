'use client';

import React from 'react';
import { Experience } from '@/types/portfolio';
import { useDomain } from '@/context/DomainContext';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceProps) {
  const { currentDomain, activeTheme } = useDomain();

  return (
    <section id="experience" className="relative py-24 border-t border-surface-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground-muted">
            <Briefcase size={14} style={{ color: activeTheme.primary }} />
            <span>03 // PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Internships &amp; Industry Impact
          </h2>
          <p className="text-base text-foreground-muted max-w-2xl">
            Hands-on software development and financial analytics internships. Note how responsibilities highlight domain-specific architectural contributions.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 sm:before:left-8 before:w-0.5 before:bg-surface-border">
          {experiences.map((exp, idx) => {
            const tailored = exp.domain_tailored?.[currentDomain];
            const displayPosition = tailored?.position || exp.position;
            const displayResponsibilities = tailored?.responsibilities || exp.responsibilities;

            return (
              <div key={exp.id} className="relative pl-12 sm:pl-20">
                {/* Timeline node icon */}
                <div
                  className="absolute left-2.5 sm:left-5.5 top-2 w-6 h-6 rounded-full border-2 bg-background flex items-center justify-center transition-colors"
                  style={{
                    borderColor: activeTheme.primary,
                    boxShadow: `0 0 10px ${activeTheme.glow}`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeTheme.primary }}
                  />
                </div>

                {/* Card Container */}
                <article className="p-6 sm:p-8 rounded-3xl border border-surface-border bg-surface/50 backdrop-blur-md shadow-lg space-y-6">
                  
                  {/* Company & Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-5">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                        {exp.company}
                      </h3>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`pos-${currentDomain}-${exp.id}`}
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -3 }}
                          transition={{ duration: 0.25 }}
                          className="text-sm sm:text-base font-semibold font-mono mt-1"
                          style={{ color: activeTheme.primary }}
                        >
                          {displayPosition}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono text-foreground-muted">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-surface-border bg-surface/80">
                        <Calendar size={13} style={{ color: activeTheme.primary }} />
                        {exp.start_date} – {exp.end_date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet Responsibilities */}
                  <div className="space-y-3">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`resp-${currentDomain}-${exp.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2.5"
                      >
                        {displayResponsibilities.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-3">
                            <CheckCircle2
                              size={16}
                              className="shrink-0 mt-0.5"
                              style={{ color: activeTheme.primary }}
                            />
                            <span className="text-xs sm:text-sm text-foreground leading-relaxed">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Technologies Used */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {exp.technologies?.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-surface-border bg-surface text-foreground-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </article>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

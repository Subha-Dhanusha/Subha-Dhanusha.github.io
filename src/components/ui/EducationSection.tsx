'use client';

import React from 'react';
import { Education } from '@/types/portfolio';
import { useDomain } from '@/context/DomainContext';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle } from 'lucide-react';

interface EducationProps {
  education: Education[];
}

export default function EducationSection({ education }: EducationProps) {
  const { activeTheme } = useDomain();

  return (
    <section id="education" className="relative py-24 border-t border-surface-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground-muted">
            <GraduationCap size={14} style={{ color: activeTheme.primary }} />
            <span>05 // ACADEMIC FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Education &amp; Honors
          </h2>
          <p className="text-base text-foreground-muted max-w-2xl">
            Undergraduate curriculum in Artificial Intelligence and Data Science at Anna University, marked by consistent department top rankings.
          </p>
        </div>

        {/* Education Details Card */}
        <div className="space-y-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-6 sm:p-8 rounded-3xl border border-surface-border bg-surface/50 backdrop-blur-md shadow-xl space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-surface-border pb-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-foreground-muted">
                    {edu.university}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-0.5">
                    {edu.institution}
                  </h3>
                  <div className="text-base sm:text-lg font-medium mt-1" style={{ color: activeTheme.primary }}>
                    {edu.degree}
                  </div>
                </div>

                <div className="flex flex-wrap lg:flex-col lg:items-end gap-2 text-xs font-mono text-foreground-muted">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-surface-border bg-surface/70">
                    <Calendar size={13} style={{ color: activeTheme.primary }} />
                    {edu.end_date}
                  </span>
                  {edu.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      {edu.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Academic Performance Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl border border-surface-border/80 bg-surface/40">
                  <span className="text-xs font-mono text-foreground-muted uppercase">Cumulative GPA</span>
                  <div className="text-2xl font-extrabold font-mono text-foreground mt-1" style={{ color: activeTheme.primary }}>
                    {edu.cgpa}
                  </div>
                </div>

                {edu.highest_gpa && (
                  <div className="p-4 rounded-2xl border border-surface-border/80 bg-surface/40">
                    <span className="text-xs font-mono text-foreground-muted uppercase">Peak Semester GPA</span>
                    <div className="text-2xl font-extrabold font-mono text-foreground mt-1" style={{ color: activeTheme.primary }}>
                      {edu.highest_gpa}
                    </div>
                  </div>
                )}

                {edu.class_xii && (
                  <div className="p-4 rounded-2xl border border-surface-border/80 bg-surface/40 col-span-2 sm:col-span-1">
                    <span className="text-xs font-mono text-foreground-muted uppercase">Class XII Score</span>
                    <div className="text-2xl font-extrabold font-mono text-foreground mt-1" style={{ color: activeTheme.primary }}>
                      {edu.class_xii}
                    </div>
                  </div>
                )}
              </div>

              {/* Honors and Recognitions */}
              {edu.achievements && edu.achievements.length > 0 && (
                <div className="pt-2 space-y-3">
                  <h4 className="text-xs font-mono uppercase font-bold text-foreground-muted flex items-center gap-2">
                    <Award size={14} style={{ color: activeTheme.primary }} />
                    <span>Academic Distinctions</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {edu.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl border border-surface-border bg-surface/30 text-xs sm:text-sm text-foreground"
                      >
                        <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color: activeTheme.primary }} />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

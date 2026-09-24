'use client';

import React, { useState } from 'react';
import { Resume, DomainId } from '@/types/portfolio';
import { useDomain } from '@/context/DomainContext';
import { FileText, Download, Eye, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { sound } from '@/lib/utils/sound';

interface ResumeSectionProps {
  resumes: Record<DomainId, Resume>;
}

export default function ResumeSection({ resumes }: ResumeSectionProps) {
  const { currentDomain, activeTheme, setDomain } = useDomain();
  const activeResume = resumes[currentDomain] || resumes['ai-ml'];

  const resumeList = [
    { id: 'ai-ml' as DomainId, label: 'AI/ML Engineer Resume' },
    { id: 'data-engineering' as DomainId, label: 'Cloud Data Engineer Resume' },
    { id: 'data-analytics' as DomainId, label: 'Financial Data Analyst Resume' },
    { id: 'software' as DomainId, label: 'Software / Full-Stack Resume' },
  ];

  return (
    <section id="resume" className="relative py-24 border-t border-surface-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground-muted">
            <FileText size={14} style={{ color: activeTheme.primary }} />
            <span>08 // RESUME SPECIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Curriculum Vitae &amp; Credentials
          </h2>
          <p className="text-base text-foreground-muted max-w-2xl">
            Each professional domain carries a targeted, verified resume tailored specifically to relevant hiring managers and technical recruiters.
          </p>
        </div>

        {/* Active Domain Resume Featured Card */}
        <div className="p-6 sm:p-10 rounded-3xl border border-surface-border bg-surface/60 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-8">
          
          {/* Subtle glow background */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: activeTheme.primary }}
          />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border"
                style={{
                  borderColor: `${activeTheme.primary}40`,
                  color: activeTheme.primary,
                  backgroundColor: `${activeTheme.primary}10`,
                }}
              >
                <Sparkles size={12} />
                <span>LINKED TO CURRENT DOMAIN</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                {activeResume.title}
              </h3>
              <p className="text-sm sm:text-base text-foreground-muted max-w-2xl leading-relaxed">
                {activeResume.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={activeResume.file_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-surface-border hover:bg-surface text-foreground font-mono text-xs font-semibold transition-colors"
              >
                <Eye size={15} />
                <span>Preview Document</span>
              </a>

              <a
                href={`/api/resumes/download/${currentDomain}`}
                download
                onClick={() => sound.click()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold text-white transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg"
                style={{
                  backgroundColor: activeTheme.primary,
                  boxShadow: `0 0 20px ${activeTheme.glow}`,
                }}
              >
                <Download size={15} />
                <span>Download PDF ({activeResume.file_size || 'PDF'})</span>
              </a>
            </div>
          </div>

          {/* Quick Switcher for all 4 resumes */}
          <div className="pt-6 border-t border-surface-border space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted block">
              Access Targeted Resumes for Other Domains:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {resumeList.map((item) => {
                const isSelected = item.id === currentDomain;
                const res = resumes[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.click();
                      setDomain(item.id);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-accent bg-surface shadow-md'
                        : 'border-surface-border bg-surface/30 hover:bg-surface/60'
                    }`}
                    style={{
                      borderColor: isSelected ? activeTheme.primary : undefined,
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                        <span className="text-foreground-muted uppercase">{item.id}</span>
                        {isSelected && (
                          <span className="flex items-center gap-1" style={{ color: activeTheme.primary }}>
                            <CheckCircle2 size={12} />
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-foreground truncate">
                        {res?.title || item.label}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-foreground-muted mt-3 pt-2 border-t border-surface-border/50">
                      <span>{res?.file_size || 'PDF'}</span>
                      <span className="flex items-center gap-1 group-hover:text-foreground">
                        Switch lens <ArrowRight size={10} />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

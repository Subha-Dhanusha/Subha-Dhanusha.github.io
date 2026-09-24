'use client';

import React from 'react';
import { Certification } from '@/types/portfolio';
import { useDomain } from '@/context/DomainContext';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';
import { sound } from '@/lib/utils/sound';

interface CertsProps {
  certifications: Certification[];
}

export default function CertificationsSection({ certifications }: CertsProps) {
  const { currentDomain, activeTheme } = useDomain();

  return (
    <section id="certifications" className="relative py-24 border-t border-surface-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground-muted">
            <Award size={14} style={{ color: activeTheme.primary }} />
            <span>06 // VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Certifications &amp; Accreditations
          </h2>
          <p className="text-base text-foreground-muted max-w-2xl">
            Professional certifications from industry leaders including Infosys, NASSCOM, IBM, and CISCO.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert) => {
            const isPriority = cert.domain_ids?.includes(currentDomain);
            return (
              <div
                key={cert.id}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isPriority
                    ? 'border-surface-border bg-surface/70 shadow-md'
                    : 'border-surface-border/60 bg-surface/40'
                }`}
                style={{
                  borderColor: isPriority ? `${activeTheme.primary}40` : undefined,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold uppercase text-foreground-muted">
                      {cert.issuer}
                    </span>
                    {cert.issue_date && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-surface-border text-foreground-muted">
                        {cert.issue_date}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-foreground leading-snug">
                    {cert.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-surface-border/60 mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono flex items-center gap-1" style={{ color: activeTheme.primary }}>
                    <CheckCircle size={12} />
                    Verified
                  </span>

                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.click()}
                      className="p-1.5 rounded-lg border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground transition-colors"
                      title="View Credential"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

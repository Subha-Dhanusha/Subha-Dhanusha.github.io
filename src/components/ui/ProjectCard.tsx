'use client';

import React from 'react';
import { Project } from '@/types/portfolio';
import { useDomain } from '@/context/DomainContext';
import { ExternalLink, Github, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { sound } from '@/lib/utils/sound';

interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
  isPrimary?: boolean;
}

export default function ProjectCard({ project, onSelect, isPrimary }: ProjectCardProps) {
  const { activeTheme } = useDomain();

  return (
    <article
      className={`group relative rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isPrimary
          ? 'border-surface-border bg-surface/70 lg:col-span-2 shadow-2xl hover:border-accent'
          : 'border-surface-border bg-surface/40 hover:bg-surface/70 shadow-lg'
      }`}
      style={{
        borderColor: isPrimary ? `${activeTheme.primary}40` : undefined,
      }}
    >
      {/* Top Banner / Graphic */}
      <div className="relative aspect-video sm:aspect-[21/9] lg:aspect-[2/1] overflow-hidden bg-surface-border/20 border-b border-surface-border">
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-xs text-foreground-muted">
            [Graphic: {project.title}]
          </div>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {isPrimary && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-white shadow-lg"
              style={{ backgroundColor: activeTheme.primary }}
            >
              <Sparkles size={12} />
              FEATURED SYSTEM
            </span>
          )}
          {project.interactive_type && project.interactive_type !== 'none' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono border border-surface-border bg-black/60 text-foreground backdrop-blur-md">
              <Layers size={11} />
              INTERACTIVE DEMO
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold font-mono" style={{ color: activeTheme.primary }}>
              {project.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Metrics Row */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {project.metrics.slice(0, 4).map((m, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl border border-surface-border/70 bg-surface/50 text-center"
                >
                  <div className="text-sm sm:text-base font-bold font-mono text-foreground" style={{ color: activeTheme.primary }}>
                    {m.value}
                  </div>
                  <div className="text-[10px] font-mono uppercase text-foreground-muted truncate">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tech tags and Action footer */}
        <div className="pt-4 border-t border-surface-border/60 space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies?.slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-surface-border bg-surface/50 text-foreground-muted"
              >
                {tech}
              </span>
            ))}
            {(project.technologies?.length || 0) > 5 && (
              <span className="px-2 py-1 rounded-md text-[10px] font-mono text-foreground-muted">
                +{(project.technologies?.length || 0) - 5} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={() => {
                sound.click();
                onSelect(project);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-foreground hover:text-accent transition-colors group-hover:translate-x-1 duration-200"
            >
              <span>Explore Architecture &amp; Case Study</span>
              <ArrowUpRight size={14} style={{ color: activeTheme.primary }} />
            </button>

            <div className="flex items-center gap-2">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  title="View GitHub Repository"
                  className="p-2 rounded-lg border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground transition-colors"
                >
                  <Github size={15} />
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  title="View Live Web Application"
                  className="p-2 rounded-lg border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground transition-colors"
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

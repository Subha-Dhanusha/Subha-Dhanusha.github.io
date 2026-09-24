'use client';

import React, { useState } from 'react';
import { Project, DomainId } from '@/types/portfolio';
import { useDomain } from '@/context/DomainContext';
import { Layers, Sparkles } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectCaseStudyModal from './ProjectCaseStudyModal';
import { sound } from '@/lib/utils/sound';

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const { currentDomain, activeTheme } = useDomain();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'current' | 'all'>('current');

  // Filter projects
  const displayedProjects = filter === 'current'
    ? projects.filter(p => !p.domain_ids || p.domain_ids.includes(currentDomain))
    : projects;

  return (
    <section id="projects" className="relative py-24 border-t border-surface-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground-muted">
              <Layers size={14} style={{ color: activeTheme.primary }} />
              <span>02 // ENGINEERING SYSTEMS &amp; CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Production Architecture &amp; Case Studies
            </h2>
            <p className="text-base text-foreground-muted max-w-2xl">
              Real-world engineering projects with documented problem formulations, architectural diagrams, rigorous benchmarks, and interactive proof-of-concept models.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-surface-border bg-surface/50 backdrop-blur-md self-start md:self-auto">
            <button
              onClick={() => { sound.tick(); setFilter('current'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                filter === 'current'
                  ? 'text-white'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
              style={{
                backgroundColor: filter === 'current' ? activeTheme.primary : 'transparent',
              }}
            >
              Current Domain Focus
            </button>
            <button
              onClick={() => { sound.tick(); setFilter('all'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                filter === 'all'
                  ? 'text-white'
                  : 'text-foreground-muted hover:text-foreground'
              }`}
              style={{
                backgroundColor: filter === 'all' ? activeTheme.primary : 'transparent',
              }}
            >
              All Engineering Systems ({projects.length})
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayedProjects.map((project) => {
            const isPrimary = project.is_primary_for?.includes(currentDomain) || false;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
                isPrimary={isPrimary}
              />
            );
          })}
        </div>

        {/* Empty state if no projects matched filter */}
        {displayedProjects.length === 0 && (
          <div className="py-16 text-center rounded-2xl border border-surface-border bg-surface/30">
            <p className="text-sm font-mono text-foreground-muted">
              No projects found for current filter criteria.
            </p>
          </div>
        )}

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectCaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

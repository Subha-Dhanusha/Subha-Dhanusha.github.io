'use client';

import React, { useState } from 'react';
import { Project } from '@/types/portfolio';
import { useDomain } from '@/context/DomainContext';
import {
  X,
  ExternalLink,
  Github,
  BookOpen,
  CheckCircle2,
  Workflow,
  Target,
  Lightbulb,
  FileCode,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { sound } from '@/lib/utils/sound';
import InteractivePlayground from './InteractivePlayground';

interface ModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectCaseStudyModal({ project, onClose }: ModalProps) {
  const { activeTheme } = useDomain();
  const [activeTab, setActiveTab] = useState<'case-study' | 'playground' | 'architecture'>('case-study');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl border border-surface-border bg-background shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-surface-border flex items-center justify-between shrink-0 bg-surface/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-mono font-bold px-2.5 py-1 rounded-full uppercase"
              style={{
                backgroundColor: `${activeTheme.primary}15`,
                color: activeTheme.primary,
                border: `1px solid ${activeTheme.primary}40`,
              }}
            >
              ENGINEERING CASE STUDY
            </span>
            <span className="text-xs font-mono text-foreground-muted hidden sm:inline">
              // {project.slug}
            </span>
          </div>

          <button
            onClick={() => {
              sound.click();
              onClose();
            }}
            className="p-2 rounded-full border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-surface-border flex items-center gap-2 overflow-x-auto bg-surface/20">
          <button
            onClick={() => { sound.tick(); setActiveTab('case-study'); }}
            className={`pb-3 px-3 text-xs font-semibold font-mono border-b-2 transition-all duration-200 ${
              activeTab === 'case-study'
                ? 'border-accent text-foreground'
                : 'border-transparent text-foreground-muted hover:text-foreground'
            }`}
            style={{ borderColor: activeTab === 'case-study' ? activeTheme.primary : 'transparent' }}
          >
            01. Case Study &amp; Results
          </button>

          {project.architecture_steps && project.architecture_steps.length > 0 && (
            <button
              onClick={() => { sound.tick(); setActiveTab('architecture'); }}
              className={`pb-3 px-3 text-xs font-semibold font-mono border-b-2 transition-all duration-200 ${
                activeTab === 'architecture'
                  ? 'border-accent text-foreground'
                  : 'border-transparent text-foreground-muted hover:text-foreground'
              }`}
              style={{ borderColor: activeTab === 'architecture' ? activeTheme.primary : 'transparent' }}
            >
              02. System Architecture Flow
            </button>
          )}

          {project.interactive_type && project.interactive_type !== 'none' && (
            <button
              onClick={() => { sound.tick(); setActiveTab('playground'); }}
              className={`pb-3 px-3 text-xs font-semibold font-mono border-b-2 flex items-center gap-1.5 transition-all duration-200 ${
                activeTab === 'playground'
                  ? 'border-accent text-foreground'
                  : 'border-transparent text-foreground-muted hover:text-foreground'
              }`}
              style={{
                borderColor: activeTab === 'playground' ? activeTheme.primary : 'transparent',
                color: activeTab === 'playground' ? activeTheme.primary : undefined,
              }}
            >
              <Activity size={13} />
              <span>03. Interactive Playground</span>
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-10">

          {/* TAB 1: Case Study */}
          {activeTab === 'case-study' && (
            <>
              {/* Title & Tagline Banner */}
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {project.title}
                </h2>
                <p className="text-base sm:text-lg font-medium" style={{ color: activeTheme.primary }}>
                  {project.subtitle}
                </p>
                <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Metrics Badge Grid */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-surface-border bg-surface/40 flex flex-col justify-between"
                    >
                      <span className="text-xl sm:text-2xl font-extrabold font-mono text-foreground" style={{ color: activeTheme.primary }}>
                        {m.value}
                      </span>
                      <span className="text-[11px] font-mono uppercase text-foreground-muted mt-1">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Problem */}
                <div className="p-6 rounded-2xl border border-surface-border bg-surface/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-400">
                    <Target size={16} />
                    <span>The Engineering Problem</span>
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {project.problem_statement}
                  </p>
                </div>

                {/* Solution */}
                <div className="p-6 rounded-2xl border border-surface-border bg-surface/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-400">
                    <Lightbulb size={16} />
                    <span>The Technical Solution</span>
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {project.solution_overview}
                  </p>
                </div>
              </div>

              {/* Implementation Highlights */}
              <div className="space-y-4">
                <h3 className="text-sm font-mono uppercase font-bold text-foreground flex items-center gap-2">
                  <FileCode size={16} style={{ color: activeTheme.primary }} />
                  <span>Key Implementation Details</span>
                </h3>
                <div className="space-y-2.5">
                  {project.implementation_highlights?.map((hl, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl border border-surface-border bg-surface/20"
                    >
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: activeTheme.primary }} />
                      <span className="text-xs sm:text-sm text-foreground leading-relaxed">
                        {hl}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Tag Cloud */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase font-bold text-foreground-muted">
                  Technologies &amp; Libraries Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg border border-surface-border bg-surface/60 font-mono text-xs text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: Architecture Flow */}
          {activeTab === 'architecture' && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Workflow size={20} style={{ color: activeTheme.primary }} />
                  <span>Pipeline &amp; System Architecture</span>
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted font-mono">
                  {project.architecture_details}
                </p>
              </div>

              {/* Visual Multi-Step Pipeline Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.architecture_steps?.map((step, idx) => (
                  <div
                    key={idx}
                    className="relative p-5 rounded-2xl border border-surface-border bg-surface/50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded border border-surface-border text-foreground-muted">
                          STEP {step.step}
                        </span>
                        {idx < (project.architecture_steps?.length || 0) - 1 && (
                          <ArrowRight size={14} className="hidden lg:block text-foreground-muted opacity-40" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-foreground mb-2">
                        {step.name}
                      </h4>
                      <p className="text-xs text-foreground-muted leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Banner Graphic Preview */}
              {project.banner_url && (
                <div className="rounded-2xl border border-surface-border overflow-hidden">
                  <img
                    src={project.banner_url}
                    alt={`${project.title} Architecture Flow`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Interactive Live Playground */}
          {activeTab === 'playground' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">
                  Interactive Proof-of-Concept Playground
                </h3>
                <p className="text-xs text-foreground-muted">
                  Test the mathematical and engineering workflows powering this project directly in your browser.
                </p>
              </div>

              <InteractivePlayground
                type={project.interactive_type}
                projectTitle={project.title}
              />
            </div>
          )}

        </div>

        {/* Modal Footer with External Links */}
        <div className="px-6 py-4 border-t border-surface-border bg-surface/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="text-xs font-mono text-foreground-muted">
            Subha Dhanusha — Technical Project Showcase
          </div>

          <div className="flex items-center gap-3">
            {project.api_url && (
              <a
                href={project.api_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-surface-border hover:bg-surface text-foreground transition-colors"
              >
                <BookOpen size={13} />
                <span>API Docs</span>
              </a>
            )}

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-surface-border hover:bg-surface text-foreground transition-colors"
              >
                <Github size={13} />
                <span>GitHub Repo</span>
              </a>
            )}

            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200"
                style={{
                  backgroundColor: activeTheme.primary,
                  boxShadow: `0 0 16px ${activeTheme.glow}`,
                }}
              >
                <span>Live Deployment</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

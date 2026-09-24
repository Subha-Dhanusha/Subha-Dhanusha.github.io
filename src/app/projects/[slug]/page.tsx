import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getPortfolioData } from '@/lib/data/portfolio-service';
import Navbar from '@/components/ui/Navbar';
import DomainSwitcher from '@/components/ui/DomainSwitcher';
import Footer from '@/components/ui/Footer';
import InteractivePlayground from '@/components/ui/InteractivePlayground';
import {
  ExternalLink,
  Github,
  BookOpen,
  CheckCircle2,
  Workflow,
  Target,
  Lightbulb,
  FileCode,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found — Subha Dhanusha P' };

  return {
    title: `${project.title} — Technical Case Study | Subha Dhanusha P`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.description,
      images: [project.thumbnail_url || '/assets/og-cover.svg'],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <DomainSwitcher />

      <main className="flex-1 pt-12 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumb back */}
          <div className="pt-6">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-foreground-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Systems Showcase</span>
            </Link>
          </div>

          {/* Header Banner */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border border-cyan-500/40 bg-cyan-500/10 text-cyan-400">
                ENGINEERING CASE STUDY
              </span>
              <span className="text-xs font-mono text-foreground-muted">
                // {project.slug}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-cyan-400 font-mono">
              {project.subtitle}
            </p>

            <p className="text-base text-foreground-muted max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metrics Row */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-surface-border bg-surface/50 backdrop-blur-md"
                >
                  <div className="text-2xl font-extrabold font-mono text-cyan-400">
                    {m.value}
                  </div>
                  <div className="text-xs font-mono uppercase text-foreground-muted mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl border border-surface-border bg-surface/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-400">
                <Target size={18} />
                <span>The Engineering Problem</span>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {project.problem_statement}
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-surface-border bg-surface/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-emerald-400">
                <Lightbulb size={18} />
                <span>The Technical Solution</span>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {project.solution_overview}
              </p>
            </div>
          </div>

          {/* Architecture Pipeline Steps */}
          {project.architecture_steps && project.architecture_steps.length > 0 && (
            <div className="space-y-6 pt-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Workflow size={22} className="text-cyan-400" />
                  <span>Architecture &amp; Data Pipeline Flow</span>
                </h2>
                <p className="text-xs font-mono text-foreground-muted">
                  {project.architecture_details}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.architecture_steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-surface-border bg-surface/50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded border border-surface-border text-foreground-muted">
                          STEP {step.step}
                        </span>
                        {idx < project.architecture_steps!.length - 1 && (
                          <ArrowRight size={14} className="hidden lg:block text-foreground-muted opacity-40" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-foreground mb-1.5">
                        {step.name}
                      </h4>
                      <p className="text-xs text-foreground-muted leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {project.banner_url && (
                <div className="rounded-3xl border border-surface-border overflow-hidden">
                  <img
                    src={project.banner_url}
                    alt={`${project.title} Architecture Flow`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* Interactive Playground Embed */}
          {project.interactive_type && project.interactive_type !== 'none' && (
            <div className="space-y-4 pt-6">
              <h2 className="text-2xl font-bold text-foreground">
                Interactive Proof of Concept
              </h2>
              <InteractivePlayground
                type={project.interactive_type}
                projectTitle={project.title}
              />
            </div>
          )}

          {/* Implementation Highlights */}
          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileCode size={20} className="text-cyan-400" />
              <span>Implementation Specifications</span>
            </h2>
            <div className="space-y-3">
              {project.implementation_highlights?.map((hl, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-surface-border bg-surface/30"
                >
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-cyan-400" />
                  <span className="text-sm text-foreground leading-relaxed">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-mono uppercase text-foreground-muted font-bold">
              Engineering Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl border border-surface-border bg-surface/50 font-mono text-xs text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-8 border-t border-surface-border flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/#projects"
              className="text-xs font-mono text-foreground-muted hover:text-foreground flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>Return to Portfolio</span>
            </Link>

            <div className="flex items-center gap-3">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-surface-border hover:bg-surface text-foreground font-mono text-xs font-semibold transition-colors"
                >
                  <Github size={15} />
                  <span>GitHub Repository</span>
                </a>
              )}

              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-mono text-xs font-bold transition-all shadow-md"
                >
                  <span>Live Web App</span>
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

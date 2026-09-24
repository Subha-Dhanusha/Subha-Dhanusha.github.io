'use client';

import React, { useState } from 'react';
import { Project, DomainId } from '@/types/portfolio';
import { Plus, Edit2, Trash2, ExternalLink, Sparkles, Check, X, Eye } from 'lucide-react';
import { sound } from '@/lib/utils/sound';
import { executeAdminMutation } from '@/lib/data/client-mutations';
import { useLiveAdminData } from '@/lib/hooks/useLiveAdminData';

interface ProjectManagerProps {
  initialProjects: Project[];
}

export default function AdminProjectManager({ initialProjects }: ProjectManagerProps) {
  const [projects, setProjects] = useLiveAdminData<Project[]>('projects', initialProjects);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEdit = (p: Project) => {
    sound.tick();
    setEditingProject({ ...p });
  };

  const handleCreateNew = () => {
    sound.click();
    setEditingProject({
      id: '',
      slug: '',
      title: '',
      subtitle: '',
      tagline: '',
      description: '',
      problem_statement: '',
      solution_overview: '',
      architecture_details: '',
      implementation_highlights: [''],
      key_results: [''],
      technologies: [''],
      metrics: [{ label: '', value: '' }],
      status: 'published',
      featured: false,
      display_order: projects.length + 1,
      domain_ids: ['ai-ml'],
      interactive_type: 'none',
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    sound.click();
    try {
      const res = await executeAdminMutation('DELETE_PROJECT', { id });
      if (res.success) {
        setProjects(prev => prev.filter(p => p.id !== id));
        showNotify(`Deleted "${title}" successfully.`);
      } else {
        alert(res.error || 'Delete failed.');
      }
    } catch (e: any) {
      alert('Delete failed: ' + (e.message || ''));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.description) {
      alert('Title and description are required.');
      return;
    }

    setIsSaving(true);
    sound.click();

    // Generate slug if empty
    const slug = editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const projectPayload = {
      ...editingProject,
      slug,
    };

    try {
      const res = await executeAdminMutation('SAVE_PROJECT', projectPayload);
      if (res.success) {
        const saved = res.data || projectPayload;
        setProjects(prev => {
          const index = prev.findIndex(p => p.id === saved.id || p.slug === saved.slug);
          if (index >= 0) {
            const copy = [...prev];
            copy[index] = saved;
            return copy;
          }
          return [...prev, saved];
        });
        sound.success();
        showNotify(`Saved "${saved.title}" successfully.`);
        setEditingProject(null);
      } else {
        alert(res.error || 'Failed to save project');
      }
    } catch (err: any) {
      alert(err.message || 'Network error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl border border-emerald-500/40 bg-surface/95 text-emerald-400 font-mono text-xs shadow-2xl flex items-center gap-2 animate-in fade-in">
          <Check size={14} />
          <span>{notification}</span>
        </div>
      )}

      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Manage Engineering Projects &amp; Case Studies
          </h2>
          <p className="text-xs font-mono text-foreground-muted">
            Configure system architectures, problem formulations, and multi-domain associations.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-mono text-xs font-bold transition-all shadow-md self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl border border-surface-border bg-surface/40 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-surface-border bg-surface/60 text-foreground-muted uppercase text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Domains</th>
                <th className="py-3.5 px-4">Key Metrics</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-surface/60 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-sm text-foreground">{p.title}</div>
                    <div className="text-[11px] text-foreground-muted line-clamp-1">{p.subtitle}</div>
                    <div className="text-[10px] text-cyan-400 mt-0.5 font-mono">/{p.slug}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {p.domain_ids?.map(d => (
                        <span key={d} className="px-2 py-0.5 rounded border border-surface-border text-[10px]">
                          {d}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-0.5">
                      {p.metrics?.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="text-[11px]">
                          <strong className="text-foreground">{m.value}</strong> <span className="text-foreground-muted text-[10px]">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      p.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {p.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-1.5 rounded-lg border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground"
                        title="Edit Project"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-1.5 rounded-lg border border-surface-border hover:bg-red-500/10 hover:border-red-500/30 text-foreground-muted hover:text-red-400"
                        title="Delete Project"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Project Modal Form */}
      {editingProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl rounded-3xl border border-surface-border bg-background p-6 sm:p-8 my-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-surface-border pb-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {editingProject.id ? `Edit: ${editingProject.title}` : 'Create New Engineering Project'}
                </h3>
                <span className="text-xs font-mono text-foreground-muted">
                  Configure detailed engineering case study specifications.
                </span>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="p-2 rounded-full border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-sm font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="e.g. medirisk-ai"
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
                  Subtitle / Positioning
                </label>
                <input
                  type="text"
                  value={editingProject.subtitle || ''}
                  onChange={(e) => setEditingProject(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
                  Executive Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
                    Problem Statement
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.problem_statement || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, problem_statement: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-xs resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
                    Technical Solution Overview
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.solution_overview || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, solution_overview: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-xs resize-none"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies?.join(', ') || ''}
                  onChange={(e) => setEditingProject(prev => ({
                    ...prev,
                    technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean),
                  }))}
                  placeholder="Python, Scikit-learn, Pandas, Flask, Docker"
                  className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-xs font-mono"
                />
              </div>

              {/* External URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={editingProject.github_url || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, github_url: e.target.value }))}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={editingProject.live_url || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, live_url: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">API Docs URL</label>
                  <input
                    type="url"
                    value={editingProject.api_url || ''}
                    onChange={(e) => setEditingProject(prev => ({ ...prev, api_url: e.target.value }))}
                    placeholder="https://.../docs"
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-xs font-mono"
                  />
                </div>
              </div>

              {/* Status and Domain Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-surface-border bg-surface/30">
                <div>
                  <label className="text-xs font-mono uppercase text-foreground-muted block mb-2">Assign to Domains:</label>
                  <div className="space-y-1.5 font-mono text-xs">
                    {(['ai-ml', 'data-engineering', 'data-analytics', 'software'] as DomainId[]).map(d => (
                      <label key={d} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingProject.domain_ids?.includes(d) || false}
                          onChange={(e) => {
                            const cur = new Set(editingProject.domain_ids || []);
                            if (e.target.checked) cur.add(d);
                            else cur.delete(d);
                            setEditingProject(prev => ({ ...prev, domain_ids: Array.from(cur) }));
                          }}
                        />
                        <span className="capitalize">{d}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Publication Status</label>
                    <select
                      value={editingProject.status || 'published'}
                      onChange={(e) => setEditingProject(prev => ({ ...prev, status: e.target.value as any }))}
                      className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-xs font-mono"
                    >
                      <option value="published">Published (Visible Publicly)</option>
                      <option value="draft">Draft (Admin Only)</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                    <input
                      type="checkbox"
                      checked={editingProject.featured || false}
                      onChange={(e) => setEditingProject(prev => ({ ...prev, featured: e.target.checked }))}
                    />
                    <span>Highlight as Featured Project</span>
                  </label>
                </div>
              </div>

              {/* Save & Cancel buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl border border-surface-border hover:bg-surface text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-mono text-xs font-bold shadow-md disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Project'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

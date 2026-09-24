'use client';

import React, { useState } from 'react';
import { Experience } from '@/types/portfolio';
import { Briefcase, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { sound } from '@/lib/utils/sound';
import { executeAdminMutation } from '@/lib/data/client-mutations';

interface ExpManagerProps {
  initialExperiences: Experience[];
}

export default function AdminExperienceManager({ initialExperiences }: ExpManagerProps) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEdit = (exp: Experience) => {
    sound.tick();
    setEditingExp({ ...exp });
  };

  const handleCreate = () => {
    sound.click();
    setEditingExp({
      id: '',
      company: '',
      position: '',
      location: '',
      work_type: 'Internship',
      start_date: '',
      end_date: '',
      responsibilities: [''],
      technologies: [''],
      display_order: experiences.length + 1,
    });
  };

  const handleDelete = async (id: string, company: string) => {
    if (!window.confirm(`Delete experience at "${company}"?`)) return;
    sound.click();
    try {
      const res = await executeAdminMutation('DELETE_EXPERIENCE', { id });
      if (res.success) {
        setExperiences(prev => prev.filter(e => e.id !== id));
        showNotify(`Deleted experience at ${company}.`);
      } else {
        alert(res.error || 'Delete failed.');
      }
    } catch (e: any) {
      alert('Delete failed: ' + (e.message || ''));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp?.company || !editingExp?.position) {
      alert('Company and position are required.');
      return;
    }
    setIsSaving(true);
    sound.click();

    try {
      const res = await executeAdminMutation('SAVE_EXPERIENCE', editingExp);
      if (res.success) {
        const saved = res.data || editingExp;
        setExperiences(prev => {
          const index = prev.findIndex(item => item.id === saved.id);
          if (index >= 0) {
            const copy = [...prev];
            copy[index] = saved;
            return copy;
          }
          return [...prev, saved];
        });
        sound.success();
        showNotify(`Saved experience at ${saved.company}.`);
        setEditingExp(null);
      } else {
        alert(res.error || 'Failed to save experience');
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl border border-emerald-500/40 bg-surface/95 text-emerald-400 font-mono text-xs shadow-2xl flex items-center gap-2 animate-in fade-in">
          <Check size={14} />
          <span>{notification}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Manage Professional Experience &amp; Internships
          </h2>
          <p className="text-xs font-mono text-foreground-muted">
            Configure companies, roles, and tailored domain bullet points.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-mono text-xs font-bold shadow-md"
        >
          <Plus size={15} />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-6 rounded-3xl border border-surface-border bg-surface/40 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-foreground">{exp.company}</span>
                <span className="text-xs font-mono text-cyan-400">• {exp.position}</span>
              </div>
              <div className="text-xs font-mono text-foreground-muted">
                {exp.start_date} – {exp.end_date} | {exp.location}
              </div>
              <ul className="space-y-1 pt-1 text-xs text-foreground-muted">
                {exp.responsibilities?.slice(0, 2).map((r, idx) => (
                  <li key={idx} className="line-clamp-1">• {r}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleEdit(exp)}
                className="p-2 rounded-lg border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => handleDelete(exp.id, exp.company)}
                className="p-2 rounded-lg border border-surface-border hover:bg-red-500/10 hover:border-red-500/30 text-foreground-muted hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingExp && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl rounded-3xl border border-surface-border bg-background p-6 sm:p-8 my-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-surface-border pb-4">
              <h3 className="text-lg font-bold text-foreground">
                {editingExp.id ? `Edit: ${editingExp.company}` : 'Add New Experience'}
              </h3>
              <button onClick={() => setEditingExp(null)} className="p-2 rounded-full border border-surface-border hover:bg-surface">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-foreground-muted block mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={editingExp.company || ''}
                    onChange={(e) => setEditingExp(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="text-foreground-muted block mb-1">Default Position *</label>
                  <input
                    type="text"
                    required
                    value={editingExp.position || ''}
                    onChange={(e) => setEditingExp(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-foreground-muted block mb-1">Location</label>
                  <input
                    type="text"
                    value={editingExp.location || ''}
                    onChange={(e) => setEditingExp(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground"
                  />
                </div>
                <div>
                  <label className="text-foreground-muted block mb-1">Start Date</label>
                  <input
                    type="text"
                    value={editingExp.start_date || ''}
                    onChange={(e) => setEditingExp(prev => ({ ...prev, start_date: e.target.value }))}
                    placeholder="e.g. Apr. 2026"
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground"
                  />
                </div>
                <div>
                  <label className="text-foreground-muted block mb-1">End Date</label>
                  <input
                    type="text"
                    value={editingExp.end_date || ''}
                    onChange={(e) => setEditingExp(prev => ({ ...prev, end_date: e.target.value }))}
                    placeholder="e.g. May 2026"
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="text-foreground-muted block mb-1">Responsibilities (one per line)</label>
                <textarea
                  rows={4}
                  value={editingExp.responsibilities?.join('\n') || ''}
                  onChange={(e) => setEditingExp(prev => ({ ...prev, responsibilities: e.target.value.split('\n').filter(Boolean) }))}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-xs resize-none"
                />
              </div>

              <div>
                <label className="text-foreground-muted block mb-1">Technologies Used (comma separated)</label>
                <input
                  type="text"
                  value={editingExp.technologies?.join(', ') || ''}
                  onChange={(e) => setEditingExp(prev => ({ ...prev, technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-surface-border">
                <button type="button" onClick={() => setEditingExp(null)} className="px-4 py-2 rounded-xl border border-surface-border hover:bg-surface">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="px-5 py-2 rounded-xl bg-cyan-500 text-white font-bold">
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

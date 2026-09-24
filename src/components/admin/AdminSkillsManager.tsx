'use client';

import React, { useState } from 'react';
import { Skill, DomainId } from '@/types/portfolio';
import { Cpu, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { sound } from '@/lib/utils/sound';
import { executeAdminMutation } from '@/lib/data/client-mutations';
import { useLiveAdminData } from '@/lib/hooks/useLiveAdminData';

interface SkillsManagerProps {
  initialSkills: Skill[];
}

export default function AdminSkillsManager({ initialSkills }: SkillsManagerProps) {
  const [skills, setSkills] = useLiveAdminData<Skill[]>('skills', initialSkills);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Machine Learning', 'Data Engineering', 'Data Analytics', 'Programming', 'Databases', 'Cloud', 'Web', 'Tools'];

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEdit = (s: Skill) => {
    sound.tick();
    setEditingSkill({ ...s });
  };

  const handleCreate = () => {
    sound.click();
    setEditingSkill({
      id: '',
      name: '',
      category: 'Machine Learning',
      proficiency: 85,
      display_order: skills.length + 1,
      domain_ids: ['ai-ml'],
    });
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete skill "${name}"?`)) return;
    sound.click();
    try {
      const res = await executeAdminMutation('DELETE_SKILL', { id });
      if (res.success) {
        setSkills(prev => prev.filter(s => s.id !== id));
        showNotify(`Deleted ${name}.`);
      } else {
        alert(res.error || 'Delete failed.');
      }
    } catch (e: any) {
      alert('Delete failed: ' + (e.message || ''));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill?.name) {
      alert('Skill name is required.');
      return;
    }
    setIsSaving(true);
    sound.click();

    try {
      const res = await executeAdminMutation('SAVE_SKILL', editingSkill);
      if (res.success) {
        const saved = res.data || editingSkill;
        setSkills(prev => {
          const index = prev.findIndex(item => item.id === saved.id);
          if (index >= 0) {
            const copy = [...prev];
            copy[index] = saved;
            return copy;
          }
          return [...prev, saved];
        });
        sound.success();
        showNotify(`Saved skill ${saved.name}.`);
        setEditingSkill(null);
      } else {
        alert(res.error || 'Failed to save skill');
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = categoryFilter === 'All'
    ? skills
    : skills.filter(s => s.category === categoryFilter);

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl border border-emerald-500/40 bg-surface/95 text-emerald-400 font-mono text-xs shadow-2xl flex items-center gap-2 animate-in fade-in">
          <Check size={14} />
          <span>{notification}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Manage Technical Skills ({skills.length})
          </h2>
          <p className="text-xs font-mono text-foreground-muted">
            Configure proficiencies, categories, and domain associations.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-mono text-xs font-bold shadow-md self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-colors border ${
              categoryFilter === cat
                ? 'bg-cyan-500 text-white border-transparent'
                : 'border-surface-border text-foreground-muted hover:text-foreground bg-surface/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((skill) => (
          <div
            key={skill.id}
            className="p-4 rounded-2xl border border-surface-border bg-surface/40 flex items-center justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">{skill.name}</span>
                <span className="text-xs font-mono text-cyan-400 font-bold">{skill.proficiency}%</span>
              </div>
              <div className="text-[11px] font-mono text-foreground-muted mt-0.5">
                {skill.category}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => handleEdit(skill)}
                className="p-1.5 rounded-lg border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground"
              >
                <Edit2 size={13} />
              </button>
              <button
                onClick={() => handleDelete(skill.id, skill.name)}
                className="p-1.5 rounded-lg border border-surface-border hover:bg-red-500/10 hover:border-red-500/30 text-foreground-muted hover:text-red-400"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingSkill && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-surface-border bg-background p-6 sm:p-8 my-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-surface-border pb-4">
              <h3 className="text-lg font-bold text-foreground">
                {editingSkill.id ? `Edit: ${editingSkill.name}` : 'Add New Skill'}
              </h3>
              <button onClick={() => setEditingSkill(null)} className="p-2 rounded-full border border-surface-border hover:bg-surface">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-foreground-muted block mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-sm"
                />
              </div>

              <div>
                <label className="text-foreground-muted block mb-1">Category</label>
                <select
                  value={editingSkill.category || 'Machine Learning'}
                  onChange={(e) => setEditingSkill(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-foreground-muted">Proficiency</label>
                  <strong className="text-cyan-400">{editingSkill.proficiency}%</strong>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={editingSkill.proficiency || 85}
                  onChange={(e) => setEditingSkill(prev => ({ ...prev, proficiency: Number(e.target.value) }))}
                  className="w-full accent-cyan-500 h-1.5 bg-surface-border rounded-lg"
                />
              </div>

              <div>
                <label className="text-foreground-muted block mb-1.5">Domains Association:</label>
                <div className="space-y-1.5">
                  {(['ai-ml', 'data-engineering', 'data-analytics', 'software'] as DomainId[]).map(d => (
                    <label key={d} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingSkill.domain_ids?.includes(d) || false}
                        onChange={(e) => {
                          const cur = new Set(editingSkill.domain_ids || []);
                          if (e.target.checked) cur.add(d);
                          else cur.delete(d);
                          setEditingSkill(prev => ({ ...prev, domain_ids: Array.from(cur) }));
                        }}
                      />
                      <span className="capitalize">{d}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-surface-border">
                <button type="button" onClick={() => setEditingSkill(null)} className="px-4 py-2 rounded-xl border border-surface-border hover:bg-surface">
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

'use client';

import React, { useState } from 'react';
import { Achievement, DomainId } from '@/types/portfolio';
import { Trophy, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { sound } from '@/lib/utils/sound';
import { executeAdminMutation } from '@/lib/data/client-mutations';

interface AchManagerProps {
  initialAchievements: Achievement[];
}

export default function AdminAchievementsManager({ initialAchievements }: AchManagerProps) {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [editingAch, setEditingAch] = useState<Partial<Achievement>>({
    id: '',
    title: '',
    description: '',
    organization: '',
    date: '2024',
    category: 'Award',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEdit = (a: Achievement) => {
    sound.tick();
    setEditingAch({ ...a });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    sound.click();
    setEditingAch({
      id: '',
      title: '',
      description: '',
      organization: 'Ramco Institute of Technology',
      date: '2024',
      category: 'Technical Contest',
      display_order: achievements.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete achievement "${title}"?`)) return;
    sound.click();
    try {
      const res = await executeAdminMutation('DELETE_ACHIEVEMENT', { id });
      if (res.success) {
        setAchievements(prev => prev.filter(a => a.id !== id));
        showNotify(`Deleted achievement.`);
      } else {
        alert(res.error || 'Delete failed.');
      }
    } catch (e: any) {
      alert('Delete failed: ' + (e.message || ''));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAch.title || !editingAch.description) {
      alert('Title and description are required.');
      return;
    }
    setIsSaving(true);
    sound.click();

    try {
      const res = await executeAdminMutation('SAVE_ACHIEVEMENT', editingAch);
      if (res.success) {
        const saved = res.data || editingAch;
        setAchievements(prev => {
          const index = prev.findIndex(item => item.id === saved.id);
          if (index >= 0) {
            const copy = [...prev];
            copy[index] = saved;
            return copy;
          }
          return [...prev, saved];
        });
        sound.success();
        showNotify(`Saved achievement.`);
        setIsModalOpen(false);
      } else {
        alert(res.error || 'Failed to save achievement');
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
            Manage Achievements &amp; Leadership ({achievements.length})
          </h2>
          <p className="text-xs font-mono text-foreground-muted">
            Code Debugging 1st place, Department Academic Topper, and AI Association Secretary roles.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-mono text-xs font-bold shadow-md"
        >
          <Plus size={15} />
          <span>Add Achievement</span>
        </button>
      </div>

      <div className="space-y-4">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="p-5 rounded-2xl border border-surface-border bg-surface/40 flex items-start justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">{ach.title}</span>
                <span className="text-xs font-mono text-cyan-400">({ach.organization || 'RIT'})</span>
              </div>
              <p className="text-xs text-foreground-muted">
                {ach.description}
              </p>
              <div className="text-[10px] font-mono text-foreground-muted pt-1">
                Category: {ach.category} | Date: {ach.date}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => handleEdit(ach)}
                className="p-1.5 rounded-lg border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground"
              >
                <Edit2 size={13} />
              </button>
              <button
                onClick={() => handleDelete(ach.id, ach.title)}
                className="p-1.5 rounded-lg border border-surface-border hover:bg-red-500/10 hover:border-red-500/30 text-foreground-muted hover:text-red-400"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-surface-border bg-background p-6 shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-foreground">
              {editingAch.id ? 'Edit Achievement' : 'Add Achievement'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-foreground-muted block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingAch.title || ''}
                  onChange={(e) => setEditingAch(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-sm"
                />
              </div>

              <div>
                <label className="text-foreground-muted block mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editingAch.description || ''}
                  onChange={(e) => setEditingAch(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-xs resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-foreground-muted block mb-1">Organization</label>
                  <input
                    type="text"
                    value={editingAch.organization || ''}
                    onChange={(e) => setEditingAch(prev => ({ ...prev, organization: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground"
                  />
                </div>
                <div>
                  <label className="text-foreground-muted block mb-1">Date / Period</label>
                  <input
                    type="text"
                    value={editingAch.date || ''}
                    onChange={(e) => setEditingAch(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-surface-border">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl border border-surface-border hover:bg-surface">
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

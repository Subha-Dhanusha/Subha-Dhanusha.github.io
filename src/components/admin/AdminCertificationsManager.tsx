'use client';

import React, { useState } from 'react';
import { Certification, DomainId } from '@/types/portfolio';
import { Award, Plus, Edit2, Trash2, Check, X, ExternalLink } from 'lucide-react';
import { sound } from '@/lib/utils/sound';
import { executeAdminMutation } from '@/lib/data/client-mutations';

interface CertsManagerProps {
  initialCerts: Certification[];
}

export default function AdminCertificationsManager({ initialCerts }: CertsManagerProps) {
  const [certs, setCerts] = useState<Certification[]>(initialCerts);
  const [editingCert, setEditingCert] = useState<Partial<Certification>>({
    id: '',
    title: '',
    issuer: '',
    issue_date: '2024',
    credential_url: '',
    domain_ids: ['ai-ml'],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEdit = (c: Certification) => {
    sound.tick();
    setEditingCert({ ...c });
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    sound.click();
    setEditingCert({
      id: '',
      title: '',
      issuer: '',
      issue_date: '2024',
      credential_url: '',
      domain_ids: ['ai-ml'],
      display_order: certs.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete certification "${title}"?`)) return;
    sound.click();
    try {
      const res = await executeAdminMutation('DELETE_CERTIFICATION', { id });
      if (res.success) {
        setCerts(prev => prev.filter(c => c.id !== id));
        showNotify(`Deleted certification.`);
      } else {
        alert(res.error || 'Delete failed.');
      }
    } catch (e: any) {
      alert('Delete failed: ' + (e.message || ''));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert.title || !editingCert.issuer) {
      alert('Title and issuer are required.');
      return;
    }
    setIsSaving(true);
    sound.click();

    try {
      const res = await executeAdminMutation('SAVE_CERTIFICATION', editingCert);
      if (res.success) {
        const saved = res.data || editingCert;
        setCerts(prev => {
          const index = prev.findIndex(item => item.id === saved.id);
          if (index >= 0) {
            const copy = [...prev];
            copy[index] = saved;
            return copy;
          }
          return [...prev, saved];
        });
        sound.success();
        showNotify(`Saved certification.`);
        setIsModalOpen(false);
      } else {
        alert(res.error || 'Failed to save certification');
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
            Manage Certifications &amp; Accreditations ({certs.length})
          </h2>
          <p className="text-xs font-mono text-foreground-muted">
            Infosys Springboard, NASSCOM Wipro, IBM, and CISCO credentials.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-mono text-xs font-bold shadow-md"
        >
          <Plus size={15} />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl border border-surface-border bg-surface/40 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase text-foreground-muted">
                  {c.issuer}
                </span>
                {c.issue_date && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-surface-border text-foreground-muted">
                    {c.issue_date}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-foreground">
                {c.title}
              </h3>
            </div>

            <div className="pt-3 border-t border-surface-border/60 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {c.domain_ids?.map(d => (
                  <span key={d} className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-surface-border text-foreground-muted">
                    {d}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleEdit(c)}
                  className="p-1.5 rounded-lg border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => handleDelete(c.id, c.title)}
                  className="p-1.5 rounded-lg border border-surface-border hover:bg-red-500/10 hover:border-red-500/30 text-foreground-muted hover:text-red-400"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-surface-border bg-background p-6 shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-foreground">
              {editingCert.id ? 'Edit Certification' : 'Add Certification'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-foreground-muted block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={editingCert.title || ''}
                  onChange={(e) => setEditingCert(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-sm"
                />
              </div>

              <div>
                <label className="text-foreground-muted block mb-1">Issuer Organization *</label>
                <input
                  type="text"
                  required
                  value={editingCert.issuer || ''}
                  onChange={(e) => setEditingCert(prev => ({ ...prev, issuer: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground"
                />
              </div>

              <div>
                <label className="text-foreground-muted block mb-1">Credential URL</label>
                <input
                  type="url"
                  value={editingCert.credential_url || ''}
                  onChange={(e) => setEditingCert(prev => ({ ...prev, credential_url: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground"
                />
              </div>

              <div>
                <label className="text-foreground-muted block mb-1.5">Domains:</label>
                <div className="space-y-1.5">
                  {(['ai-ml', 'data-engineering', 'data-analytics', 'software'] as DomainId[]).map(d => (
                    <label key={d} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingCert.domain_ids?.includes(d) || false}
                        onChange={(e) => {
                          const cur = new Set(editingCert.domain_ids || []);
                          if (e.target.checked) cur.add(d);
                          else cur.delete(d);
                          setEditingCert(prev => ({ ...prev, domain_ids: Array.from(cur) }));
                        }}
                      />
                      <span className="capitalize">{d}</span>
                    </label>
                  ))}
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

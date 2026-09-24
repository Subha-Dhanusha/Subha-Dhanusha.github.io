'use client';

import React, { useState } from 'react';
import { Domain, DomainId } from '@/types/portfolio';
import { Plus, Edit2, Trash2, Check, Sparkles, AlertCircle, Layers } from 'lucide-react';
import { sound } from '@/lib/utils/sound';
import { executeAdminMutation } from '@/lib/data/client-mutations';

interface DomainManagerProps {
  initialDomains: Domain[];
}

export default function AdminDomainManager({ initialDomains }: DomainManagerProps) {
  const [domains, setDomains] = useState<Domain[]>(initialDomains);
  const [editingDomain, setEditingDomain] = useState<Domain | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleOpenCreate = () => {
    sound.click();
    setIsCreating(true);
    setEditingDomain({
      id: '' as DomainId,
      name: '',
      slug: '',
      role_title: '',
      tagline: '',
      badge_text: '',
      accent_color: '#06b6d4',
      secondary_color: '#8b5cf6',
      theme_code: 'custom',
      is_active: true,
      display_order: domains.length + 1,
    });
  };

  const handleNameChange = (nameVal: string) => {
    if (!editingDomain) return;
    const generatedSlug = nameVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const generatedBadge = `MODE ${String(editingDomain.display_order || domains.length + 1).padStart(2, '0')} // ${nameVal.toUpperCase()}`;

    setEditingDomain(prev => prev ? ({
      ...prev,
      name: nameVal,
      slug: isCreating ? generatedSlug : prev.slug,
      id: isCreating ? generatedSlug as DomainId : prev.id,
      badge_text: isCreating || !prev.badge_text ? generatedBadge : prev.badge_text,
    }) : null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDomain) return;
    sound.click();
    setLoading(true);

    let domainToSave = { ...editingDomain };
    if (!domainToSave.slug) {
      domainToSave.slug = domainToSave.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (!domainToSave.id) {
      domainToSave.id = domainToSave.slug as DomainId;
    }
    if (!domainToSave.badge_text) {
      domainToSave.badge_text = `MODE ${String(domainToSave.display_order || domains.length + 1).padStart(2, '0')} // ${domainToSave.name.toUpperCase()}`;
    }

    try {
      const res = await executeAdminMutation('SAVE_DOMAIN', domainToSave);

      if (res.success) {
        const savedItem: Domain = res.data || domainToSave;
        setDomains(prev => {
          const index = prev.findIndex(d => d.id === savedItem.id);
          if (index >= 0) {
            return prev.map(d => d.id === savedItem.id ? savedItem : d);
          } else {
            return [...prev, savedItem];
          }
        });
        sound.success();
        showNotify(`Domain "${savedItem.name}" saved & synced with Supabase.`);
        setEditingDomain(null);
        setIsCreating(false);
      } else {
        alert('Failed to save domain: ' + (res.error || 'Please try again.'));
      }
    } catch (e: any) {
      alert('Save operation failed: ' + (e.message || ''));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the domain "${name}" (${id})? This will also remove its associated records in Supabase.`)) {
      return;
    }
    sound.click();

    try {
      const res = await executeAdminMutation('DELETE_DOMAIN', { id });

      if (res.success) {
        setDomains(prev => prev.filter(d => d.id !== id));
        sound.success();
        showNotify(`Domain "${name}" removed from database.`);
        if (editingDomain?.id === id) {
          setEditingDomain(null);
          setIsCreating(false);
        }
      } else {
        alert('Delete failed: ' + (res.error || 'Please try again.'));
      }
    } catch (e: any) {
      alert('Delete failed: ' + (e.message || ''));
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

      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Manage Professional Domains &amp; Visual Identifiers
          </h2>
          <p className="text-sm font-mono text-foreground-muted mt-1">
            Configure specialized professional identities, role titles, taglines, and theme accents connected to Supabase.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-mono text-sm font-bold transition-all shadow-lg shadow-cyan-500/20 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add New Domain</span>
        </button>
      </div>

      {/* Domains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {domains.map((dom) => (
          <div
            key={dom.id}
            className="p-6 rounded-3xl border border-surface-border bg-surface/40 space-y-4 relative overflow-hidden transition-all hover:border-surface-border/80"
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-15 pointer-events-none"
              style={{ backgroundColor: dom.accent_color }}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-mono px-3 py-1.5 rounded-full uppercase font-bold text-white shadow-sm"
                  style={{ backgroundColor: dom.accent_color }}
                >
                  {dom.id}
                </span>
                {dom.is_active === false && (
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Inactive
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    sound.tick();
                    setIsCreating(false);
                    setEditingDomain({ ...dom });
                  }}
                  title="Edit Domain"
                  className="p-2 rounded-xl border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground transition-colors"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(dom.id, dom.name)}
                  title="Delete Domain"
                  className="p-2 rounded-xl border border-surface-border hover:bg-red-500/10 hover:border-red-500/30 text-foreground-muted hover:text-red-400 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                {dom.name}
              </h3>
              <div className="text-sm sm:text-base font-mono font-semibold mt-1" style={{ color: dom.accent_color }}>
                {dom.role_title}
              </div>
              <p className="text-sm text-foreground-muted mt-2 leading-relaxed">
                {dom.tagline}
              </p>
            </div>

            <div className="pt-3 border-t border-surface-border/60 flex items-center justify-between text-xs sm:text-sm font-mono text-foreground-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dom.accent_color }} />
                <span>Accent: <strong style={{ color: dom.accent_color }}>{dom.accent_color}</strong></span>
              </span>
              <span>Theme Code: <strong>{dom.theme_code}</strong></span>
              <span>Order: <strong>#{dom.display_order}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {editingDomain && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl rounded-3xl border border-surface-border bg-background p-6 sm:p-8 my-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-surface-border pb-4">
              <div className="flex items-center gap-2">
                <Layers size={18} className="text-cyan-400" />
                <h3 className="text-lg font-bold text-foreground">
                  {isCreating ? 'Create New Professional Domain' : `Edit Domain: ${editingDomain.name}`}
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-surface border border-surface-border text-foreground-muted">
                Supabase Connected
              </span>
            </div>

            <form onSubmit={handleSave} className="space-y-4 font-mono text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-foreground-muted block mb-1">Domain Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cybersecurity & InfoSec"
                    value={editingDomain.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-foreground-muted block mb-1">
                    Slug / Unique ID * {isCreating && <span className="text-xs text-cyan-400 font-bold">(Auto)</span>}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. cybersecurity"
                    value={editingDomain.slug}
                    onChange={(e) => setEditingDomain(prev => prev ? ({ ...prev, slug: e.target.value, id: e.target.value as DomainId }) : null)}
                    className="w-full px-3 py-2.5 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-foreground-muted block mb-1">Professional Role Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cybersecurity Specialist"
                  value={editingDomain.role_title}
                  onChange={(e) => setEditingDomain(prev => prev ? ({ ...prev, role_title: e.target.value }) : null)}
                  className="w-full px-3 py-2.5 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-sm font-semibold focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-foreground-muted block mb-1">Tagline / Mission Statement</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Threat Hunting, Network Defense & Evidence Management"
                  value={editingDomain.tagline}
                  onChange={(e) => setEditingDomain(prev => prev ? ({ ...prev, tagline: e.target.value }) : null)}
                  className="w-full px-3 py-2.5 rounded-xl border border-surface-border bg-surface text-foreground resize-none focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-foreground-muted block mb-1">Badge Text</label>
                  <input
                    type="text"
                    placeholder="e.g. MODE 05 // CYBERSECURITY"
                    value={editingDomain.badge_text}
                    onChange={(e) => setEditingDomain(prev => prev ? ({ ...prev, badge_text: e.target.value }) : null)}
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground"
                  />
                </div>

                <div>
                  <label className="text-foreground-muted block mb-1">Theme Code</label>
                  <select
                    value={editingDomain.theme_code}
                    onChange={(e) => setEditingDomain(prev => prev ? ({ ...prev, theme_code: e.target.value }) : null)}
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground"
                  >
                    <option value="custom">Custom Theme</option>
                    <option value="aiml">AI / ML (Cyan)</option>
                    <option value="de">Data Engineering (Amber)</option>
                    <option value="da">Data Analytics (Emerald)</option>
                    <option value="se">Software (Purple)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-foreground-muted block mb-1">Primary Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingDomain.accent_color || '#06b6d4'}
                      onChange={(e) => setEditingDomain(prev => prev ? ({ ...prev, accent_color: e.target.value }) : null)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-surface-border bg-transparent p-0"
                    />
                    <input
                      type="text"
                      value={editingDomain.accent_color}
                      onChange={(e) => setEditingDomain(prev => prev ? ({ ...prev, accent_color: e.target.value }) : null)}
                      className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-foreground-muted block mb-1">Secondary Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingDomain.secondary_color || '#8b5cf6'}
                      onChange={(e) => setEditingDomain(prev => prev ? ({ ...prev, secondary_color: e.target.value }) : null)}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-surface-border bg-transparent p-0"
                    />
                    <input
                      type="text"
                      value={editingDomain.secondary_color}
                      onChange={(e) => setEditingDomain(prev => prev ? ({ ...prev, secondary_color: e.target.value }) : null)}
                      className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground uppercase"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center pt-2">
                <div>
                  <label className="text-foreground-muted block mb-1">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={editingDomain.display_order}
                    onChange={(e) => setEditingDomain(prev => prev ? ({ ...prev, display_order: Number(e.target.value) }) : null)}
                    className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="is_active_domain"
                    checked={editingDomain.is_active !== false}
                    onChange={(e) => setEditingDomain(prev => prev ? ({ ...prev, is_active: e.target.checked }) : null)}
                    className="w-4 h-4 rounded border-surface-border text-cyan-500 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="is_active_domain" className="text-foreground text-sm cursor-pointer">
                    Active / Visible on public site
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => {
                    setEditingDomain(null);
                    setIsCreating(false);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-surface-border hover:bg-surface text-foreground-muted hover:text-foreground text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-sm transition-all disabled:opacity-50"
                >
                  {loading ? 'Saving to Database...' : isCreating ? 'Create Domain' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

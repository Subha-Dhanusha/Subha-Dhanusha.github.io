'use client';

import React, { useState } from 'react';
import { AboutSection, DomainId } from '@/types/portfolio';
import { Save, Check } from 'lucide-react';
import { sound } from '@/lib/utils/sound';
import { executeAdminMutation } from '@/lib/data/client-mutations';
import { useLiveAdminData } from '@/lib/hooks/useLiveAdminData';

interface AboutManagerProps {
  initialAbouts: Record<DomainId, AboutSection>;
}

export default function AdminAboutManager({ initialAbouts }: AboutManagerProps) {
  const [abouts, setAbouts] = useLiveAdminData<Record<DomainId, AboutSection>>('aboutSections', initialAbouts);
  const [selectedDomain, setSelectedDomain] = useState<DomainId>('ai-ml');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activeAbout = abouts[selectedDomain] || {
    domain_id: selectedDomain,
    role_subtitle: '',
    bio: '',
    highlights: [],
    focus_areas: [],
    stats: [],
  };

  const handleFieldChange = (field: keyof AboutSection, value: any) => {
    setAbouts(prev => ({
      ...prev,
      [selectedDomain]: {
        ...prev[selectedDomain],
        [field]: value,
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    sound.click();

    try {
      const res = await executeAdminMutation('UPDATE_ABOUT', {
        ...activeAbout,
        domain_id: selectedDomain,
      });

      if (res.success) {
        sound.success();
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      } else {
        alert('Failed to update about section: ' + (res.error || 'Check network connection'));
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Domain Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-surface-border">
        {(['ai-ml', 'data-engineering', 'data-analytics', 'software'] as DomainId[]).map((d) => (
          <button
            key={d}
            onClick={() => {
              sound.tick();
              setSelectedDomain(d);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
              selectedDomain === d
                ? 'bg-cyan-500 text-white shadow-md'
                : 'border border-surface-border text-foreground-muted hover:text-foreground hover:bg-surface'
            }`}
          >
            {d.replace('-', ' ')}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              About Section: [{selectedDomain.toUpperCase()}]
            </h2>
            <p className="text-xs font-mono text-foreground-muted">
              Tailor the professional biography, technical narrative, and key metric achievements.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-mono text-xs font-bold shadow-md disabled:opacity-50"
          >
            {savedSuccess ? (
              <>
                <Check size={14} />
                <span>Saved Successfully!</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>{isSaving ? 'Saving...' : 'Save About Changes'}</span>
              </>
            )}
          </button>
        </div>

        <div className="p-6 rounded-3xl border border-surface-border bg-surface/40 space-y-5">
          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
              Role Positioning Subtitle
            </label>
            <input
              type="text"
              value={activeAbout.role_subtitle || ''}
              onChange={(e) => handleFieldChange('role_subtitle', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-surface-border bg-surface text-foreground text-sm font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
              Full Narrative Biography
            </label>
            <textarea
              rows={4}
              value={activeAbout.bio || ''}
              onChange={(e) => handleFieldChange('bio', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-surface-border bg-surface text-foreground text-xs leading-relaxed resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
              Domain Accomplishments / Highlights (One per line)
            </label>
            <textarea
              rows={4}
              value={activeAbout.highlights?.join('\n') || ''}
              onChange={(e) => handleFieldChange('highlights', e.target.value.split('\n').filter(Boolean))}
              className="w-full px-3 py-2.5 rounded-xl border border-surface-border bg-surface text-foreground text-xs leading-relaxed resize-none font-mono"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { HeroSection, DomainId } from '@/types/portfolio';
import { Sparkles, Save, Check } from 'lucide-react';
import { sound } from '@/lib/utils/sound';
import { executeAdminMutation } from '@/lib/data/client-mutations';
import { useLiveAdminData } from '@/lib/hooks/useLiveAdminData';

interface HeroManagerProps {
  initialHeroes: Record<DomainId, HeroSection>;
}

export default function AdminHeroManager({ initialHeroes }: HeroManagerProps) {
  const [heroes, setHeroes] = useLiveAdminData<Record<DomainId, HeroSection>>('heroSections', initialHeroes);
  const [selectedDomain, setSelectedDomain] = useState<DomainId>('ai-ml');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activeHero = heroes[selectedDomain] || {
    domain_id: selectedDomain,
    headline: '',
    subheadline: '',
    description: '',
    primary_cta_label: 'Explore Work',
    primary_cta_url: '#projects',
    secondary_cta_label: 'Download Resume',
    secondary_cta_url: '#resume',
    badge_text: '',
    terminal_lines: [],
  };

  const handleFieldChange = (field: keyof HeroSection, value: any) => {
    setHeroes(prev => ({
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
      const res = await executeAdminMutation('UPDATE_HERO', {
        ...activeHero,
        domain_id: selectedDomain,
      });

      if (res.success) {
        sound.success();
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      } else {
        alert('Failed to update hero: ' + (res.error || 'Please try again.'));
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
              Hero Section: [{selectedDomain.toUpperCase()}]
            </h2>
            <p className="text-xs font-mono text-foreground-muted">
              Customize the landing typography, positioning message, and action triggers.
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
                <span>{isSaving ? 'Saving...' : 'Save Hero Changes'}</span>
              </>
            )}
          </button>
        </div>

        <div className="p-6 rounded-3xl border border-surface-border bg-surface/40 space-y-5">
          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
              Badge Tagline
            </label>
            <input
              type="text"
              value={activeHero.badge_text || ''}
              onChange={(e) => handleFieldChange('badge_text', e.target.value)}
              placeholder="e.g. MODE 01 // MACHINE LEARNING SPECIALIZATION"
              className="w-full px-3 py-2.5 rounded-xl border border-surface-border bg-surface text-foreground text-xs font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
              Headline
            </label>
            <input
              type="text"
              value={activeHero.headline || ''}
              onChange={(e) => handleFieldChange('headline', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-surface-border bg-surface text-foreground text-sm font-bold"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
              Subheadline / Role Title
            </label>
            <input
              type="text"
              value={activeHero.subheadline || ''}
              onChange={(e) => handleFieldChange('subheadline', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-surface-border bg-surface text-foreground text-sm font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
              Summary Description
            </label>
            <textarea
              rows={3}
              value={activeHero.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-surface-border bg-surface text-foreground text-xs leading-relaxed resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
                Primary CTA Label
              </label>
              <input
                type="text"
                value={activeHero.primary_cta_label || ''}
                onChange={(e) => handleFieldChange('primary_cta_label', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
                Secondary CTA Label
              </label>
              <input
                type="text"
                value={activeHero.secondary_cta_label || ''}
                onChange={(e) => handleFieldChange('secondary_cta_label', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-xs font-mono"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

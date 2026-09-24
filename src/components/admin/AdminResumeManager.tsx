'use client';

import React, { useState } from 'react';
import { Resume, DomainId } from '@/types/portfolio';
import { FileText, Download, Save, Check, ExternalLink } from 'lucide-react';
import { sound } from '@/lib/utils/sound';

interface ResumeManagerProps {
  initialResumes: Record<DomainId, Resume>;
}

export default function AdminResumeManager({ initialResumes }: ResumeManagerProps) {
  const [resumes, setResumes] = useState<Record<DomainId, Resume>>(initialResumes);
  const [selectedDomain, setSelectedDomain] = useState<DomainId>('ai-ml');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activeResume = resumes[selectedDomain] || {
    id: `res-${selectedDomain}`,
    domain_id: selectedDomain,
    title: '',
    description: '',
    file_url: `/resumes/Subha_Dhanusha_${selectedDomain}_Resume.pdf`,
    file_name: `Subha_Dhanusha_${selectedDomain}_Resume.pdf`,
    file_size: '37 KB',
    is_active: true,
    download_count: 0,
  };

  const handleFieldChange = (field: keyof Resume, value: any) => {
    setResumes(prev => ({
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
      const res = await fetch('/api/admin/mutate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'UPDATE_RESUME',
          payload: { ...activeResume, domain_id: selectedDomain },
        }),
      });

      if (res.ok) {
        sound.success();
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      } else {
        alert('Failed to update resume settings.');
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Domain Selector */}
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

      <form onSubmit={handleSave} className="max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Resume Configuration: [{selectedDomain.toUpperCase()}]
            </h2>
            <p className="text-xs font-mono text-foreground-muted">
              Map and manage the targeted PDF document downloaded when in this domain mode.
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
                <span>{isSaving ? 'Saving...' : 'Save Resume Settings'}</span>
              </>
            )}
          </button>
        </div>

        <div className="p-6 rounded-3xl border border-surface-border bg-surface/40 space-y-5">
          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
              Resume Document Title *
            </label>
            <input
              type="text"
              required
              value={activeResume.title || ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-surface-border bg-surface text-foreground text-sm font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
              Document Description
            </label>
            <textarea
              rows={3}
              value={activeResume.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-surface-border bg-surface text-foreground text-xs leading-relaxed resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
                File Path / URL *
              </label>
              <input
                type="text"
                required
                value={activeResume.file_url || ''}
                onChange={(e) => handleFieldChange('file_url', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">
                File Size Badge
              </label>
              <input
                type="text"
                value={activeResume.file_size || ''}
                onChange={(e) => handleFieldChange('file_size', e.target.value)}
                placeholder="e.g. 98 KB"
                className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-xs font-mono"
              />
            </div>
          </div>

          {/* Test & preview */}
          <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between">
            <span className="text-xs font-mono text-foreground-muted">
              Total Recorded Downloads: <strong className="text-foreground">{activeResume.download_count || 0}</strong>
            </span>

            <a
              href={activeResume.file_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-border hover:bg-surface text-xs font-mono text-foreground"
            >
              <span>Verify PDF in New Tab</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

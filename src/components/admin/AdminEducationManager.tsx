'use client';

import React, { useState } from 'react';
import { Education } from '@/types/portfolio';
import { GraduationCap, Save, Check } from 'lucide-react';
import { sound } from '@/lib/utils/sound';

interface EduManagerProps {
  initialEducation: Education[];
}

export default function AdminEducationManager({ initialEducation }: EduManagerProps) {
  const [edu, setEdu] = useState<Education>(initialEducation[0] || {
    id: 'edu-01',
    institution: 'Ramco Institute of Technology',
    degree: 'B.Tech in Artificial Intelligence and Data Science',
    university: 'Anna University',
    end_date: 'Expected May 2027',
    cgpa: '8.28 / 10.0',
    highest_gpa: '8.91 / 10.0',
    class_xii: '87.67% (April 2023)',
    location: 'Rajapalayam / Kovilpatti, Tamil Nadu',
    achievements: [],
    display_order: 1,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    sound.click();

    try {
      const res = await fetch('/api/admin/mutate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'UPDATE_SETTINGS',
          payload: { education: [edu] },
        }),
      });

      if (res.ok) {
        sound.success();
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      }
    } catch (err: any) {
      alert(err.message || 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Manage Academic Curriculum &amp; GPA
          </h2>
          <p className="text-xs font-mono text-foreground-muted">
            Undergraduate details at Ramco Institute of Technology (Anna University).
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-mono text-xs font-bold shadow-md disabled:opacity-50"
        >
          {savedSuccess ? (
            <>
              <Check size={14} />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save size={14} />
              <span>{isSaving ? 'Saving...' : 'Save Education Details'}</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="max-w-3xl p-6 sm:p-8 rounded-3xl border border-surface-border bg-surface/40 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Institution</label>
            <input
              type="text"
              required
              value={edu.institution}
              onChange={(e) => setEdu(prev => ({ ...prev, institution: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-sm font-bold"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Affiliated University</label>
            <input
              type="text"
              required
              value={edu.university}
              onChange={(e) => setEdu(prev => ({ ...prev, university: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Degree Program</label>
          <input
            type="text"
            required
            value={edu.degree}
            onChange={(e) => setEdu(prev => ({ ...prev, degree: e.target.value }))}
            className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-sm font-semibold text-cyan-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Cumulative CGPA</label>
            <input
              type="text"
              value={edu.cgpa}
              onChange={(e) => setEdu(prev => ({ ...prev, cgpa: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-mono text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Highest Semester GPA</label>
            <input
              type="text"
              value={edu.highest_gpa || ''}
              onChange={(e) => setEdu(prev => ({ ...prev, highest_gpa: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-mono text-xs"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Class XII %</label>
            <input
              type="text"
              value={edu.class_xii || ''}
              onChange={(e) => setEdu(prev => ({ ...prev, class_xii: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Academic Honors &amp; Recognitions (One per line)</label>
          <textarea
            rows={4}
            value={edu.achievements?.join('\n') || ''}
            onChange={(e) => setEdu(prev => ({ ...prev, achievements: e.target.value.split('\n').filter(Boolean) }))}
            className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-xs resize-none leading-relaxed"
          />
        </div>
      </form>
    </div>
  );
}

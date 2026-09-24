'use client';

import React, { useState } from 'react';
import { SiteSettings, Profile } from '@/types/portfolio';
import { Settings, Save, Check, Database, Globe, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { sound } from '@/lib/utils/sound';
import { executeAdminMutation } from '@/lib/data/client-mutations';
import { useLiveAdminData } from '@/lib/hooks/useLiveAdminData';

interface SettingsProps {
  initialSettings: SiteSettings;
  profile: Profile;
}

export default function AdminSettingsManager({ initialSettings, profile }: SettingsProps) {
  const [settings, setSettings] = useLiveAdminData<SiteSettings>('siteSettings' as any, initialSettings);
  const [prof, setProf] = useState<Profile>(profile);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    sound.click();

    try {
      const res = await executeAdminMutation('UPDATE_SETTINGS', {
        ...settings,
        profile: prof,
      });

      if (res.success) {
        sound.success();
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      } else {
        alert('Save failed: ' + (res.error || 'Please try again.'));
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
            Site Settings &amp; Social Links
          </h2>
          <p className="text-xs font-mono text-foreground-muted">
            Configure global metadata, contact emails, professional profiles, and platform flags.
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
              <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="max-w-4xl space-y-6">
        
        {/* Profile and Social Links */}
        <div className="p-6 sm:p-8 rounded-3xl border border-surface-border bg-surface/40 space-y-5">
          <h3 className="text-sm font-bold font-mono uppercase text-foreground flex items-center gap-2">
            <Globe size={16} className="text-cyan-400" />
            <span>Profile &amp; Professional Social Accounts</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Full Name</label>
              <input
                type="text"
                value={prof.full_name}
                onChange={(e) => setProf(prev => ({ ...prev, full_name: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-sm font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Contact Email</label>
              <input
                type="email"
                value={prof.email}
                onChange={(e) => setProf(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Phone Number</label>
              <input
                type="text"
                value={prof.phone || ''}
                onChange={(e) => setProf(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Location</label>
              <input
                type="text"
                value={prof.location || ''}
                onChange={(e) => setProf(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">GitHub Profile URL</label>
              <input
                type="url"
                value={prof.github_url}
                onChange={(e) => setProf(prev => ({ ...prev, github_url: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={prof.linkedin_url}
                onChange={(e) => setProf(prev => ({ ...prev, linkedin_url: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Global Metadata & Flags */}
        <div className="p-6 sm:p-8 rounded-3xl border border-surface-border bg-surface/40 space-y-5">
          <h3 className="text-sm font-bold font-mono uppercase text-foreground flex items-center gap-2">
            <Settings size={16} className="text-cyan-400" />
            <span>Platform Metadata &amp; Features</span>
          </h3>

          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Site SEO Title</label>
            <input
              type="text"
              value={settings.site_title}
              onChange={(e) => setSettings(prev => ({ ...prev, site_title: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground font-sans text-sm font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase text-foreground-muted block mb-1">Site SEO Meta Description</label>
            <textarea
              rows={2}
              value={settings.description}
              onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl border border-surface-border bg-surface text-foreground text-xs resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <label className="flex items-center gap-2 p-3 rounded-xl border border-surface-border bg-surface/40 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.available_for_hire}
                onChange={(e) => setSettings(prev => ({ ...prev, available_for_hire: e.target.checked }))}
              />
              <span className="text-xs font-mono font-medium">Show &quot;Available for Hire&quot; Status Badge</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-xl border border-surface-border bg-surface/40 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.sound_effects_enabled}
                onChange={(e) => setSettings(prev => ({ ...prev, sound_effects_enabled: e.target.checked }))}
              />
              <span className="text-xs font-mono font-medium">Enable Procedural Sound Synthesizer</span>
            </label>
          </div>
        </div>

      </form>
    </div>
  );
}

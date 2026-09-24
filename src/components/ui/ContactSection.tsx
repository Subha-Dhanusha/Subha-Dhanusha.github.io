'use client';

import React, { useState } from 'react';
import { useDomain } from '@/context/DomainContext';
import { Profile } from '@/types/portfolio';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Linkedin, Github, MessageSquare } from 'lucide-react';
import { sound } from '@/lib/utils/sound';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

interface ContactProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactProps) {
  const { currentDomain, activeTheme } = useDomain();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccess(false);

    try {
      if (isSupabaseConfigured()) {
        try {
          const { error: sbError } = await supabase.from('messages').insert([
            {
              name: name.trim(),
              email: email.trim().toLowerCase(),
              subject: subject ? subject.trim() : `Inquiry regarding ${currentDomain} specialization`,
              message: message.trim(),
              domain_context: currentDomain,
              is_read: false,
              is_replied: false,
            },
          ]);

          if (!sbError) {
            setSuccess(true);
            sound.success();
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn('Direct Supabase insert failed, attempting API route fallback...', e);
        }
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: subject || `Inquiry regarding ${currentDomain} specialization`,
          message,
          domain_context: currentDomain,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        sound.success();
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setErrorMessage(data.error || 'Failed to deliver message. Please try again.');
        sound.click();
      }
    } catch (err: any) {
      if (success) return;
      setErrorMessage(err.message || 'Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 border-t border-surface-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground-muted">
            <MessageSquare size={14} style={{ color: activeTheme.primary }} />
            <span>09 // INITIATE CONVERSATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Get in Touch
          </h2>
          <p className="text-base text-foreground-muted max-w-2xl">
            Whether you represent an engineering team seeking an AI/Data intern, a recruiter scouting cloud data talent, or a fellow builder, my inbox is open.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl border border-surface-border bg-surface/50 backdrop-blur-xl space-y-6">
              <h3 className="text-xl font-bold text-foreground">
                Direct Channels
              </h3>

              <div className="space-y-4 text-sm font-mono">
                <a
                  href={`mailto:${profile.email || 'sdsubi0610@gmail.com'}`}
                  onClick={() => sound.click()}
                  className="flex items-center gap-3 p-3 rounded-xl border border-surface-border bg-surface/40 hover:bg-surface text-foreground transition-colors group"
                >
                  <Mail size={18} style={{ color: activeTheme.primary }} />
                  <span className="truncate">{profile.email || 'sdsubi0610@gmail.com'}</span>
                </a>

                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    onClick={() => sound.click()}
                    className="flex items-center gap-3 p-3 rounded-xl border border-surface-border bg-surface/40 hover:bg-surface text-foreground transition-colors group"
                  >
                    <Phone size={18} style={{ color: activeTheme.primary }} />
                    <span>{profile.phone}</span>
                  </a>
                )}

                <div className="flex items-center gap-3 p-3 rounded-xl border border-surface-border bg-surface/40 text-foreground-muted">
                  <MapPin size={18} style={{ color: activeTheme.primary }} />
                  <span>{profile.location || 'Kovilpatti, Tamil Nadu, India'}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-surface-border space-y-3">
                <span className="text-xs font-mono uppercase text-foreground-muted block">
                  Professional Profiles:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-border bg-surface/40 hover:bg-surface text-xs font-mono font-medium text-foreground transition-colors"
                  >
                    <Github size={15} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-border bg-surface/40 hover:bg-surface text-xs font-mono font-medium text-foreground transition-colors"
                  >
                    <Linkedin size={15} style={{ color: activeTheme.primary }} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Availability Notice */}
              <div className="p-4 rounded-xl border border-surface-border/60 bg-emerald-500/10 text-emerald-400 text-xs font-mono flex items-start gap-2.5">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <span>Actively interviewing for Summer 2026 &amp; 2027 Engineering Opportunities.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl border border-surface-border bg-surface/70 backdrop-blur-xl shadow-2xl space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground">
                  Send a Structured Message
                </h3>
                <p className="text-xs font-mono text-foreground-muted">
                  Transmitting with context: <strong style={{ color: activeTheme.primary }}>[{currentDomain.toUpperCase()}]</strong>
                </p>
              </div>

              {/* Success Notification */}
              {success && (
                <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-mono flex items-start gap-2.5 animate-in fade-in">
                  <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                  <div>
                    <strong>Message Delivered!</strong> Thank you for reaching out. Subha will respond shortly.
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {errorMessage && (
                <div className="p-4 rounded-2xl border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-mono flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase text-foreground-muted block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface/50 text-foreground text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-foreground-muted block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. elena@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface/50 text-foreground text-sm focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-foreground-muted block mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={`e.g. Discussion regarding ${currentDomain} role`}
                  className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface/50 text-foreground text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-foreground-muted block mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your inquiry, opportunity, or feedback..."
                  className="w-full px-4 py-3 rounded-xl border border-surface-border bg-surface/50 text-foreground text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                onClick={() => sound.click()}
                className="w-full py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-white transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shadow-lg disabled:opacity-50"
                style={{
                  backgroundColor: activeTheme.primary,
                  boxShadow: `0 0 24px ${activeTheme.glow}`,
                }}
              >
                {loading ? (
                  <span>Transmitting Message...</span>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

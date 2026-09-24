'use client';

import React, { useState } from 'react';
import { ContactMessage } from '@/types/portfolio';
import { Mail, CheckCircle2, Clock, Trash2, Reply, Check } from 'lucide-react';
import { sound } from '@/lib/utils/sound';
import { executeAdminMutation } from '@/lib/data/client-mutations';

interface MessagesManagerProps {
  initialMessages: ContactMessage[];
}

export default function AdminMessagesManager({ initialMessages }: MessagesManagerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleToggleStatus = async (id: string, updates: { is_read?: boolean; is_replied?: boolean }) => {
    sound.tick();
    try {
      const res = await executeAdminMutation('UPDATE_MESSAGE_STATUS', { id, updates });

      if (res.success) {
        setMessages(prev => prev.map(m => (m.id === id ? { ...m, ...updates } : m)));
        showNotify('Updated message status.');
      } else {
        alert(res.error || 'Status update failed');
      }
    } catch (e: any) {
      alert('Status update failed: ' + (e.message || ''));
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    sound.click();
    try {
      const res = await executeAdminMutation('DELETE_MESSAGE', { id });

      if (res.success) {
        setMessages(prev => prev.filter(m => m.id !== id));
        showNotify('Message deleted.');
      } else {
        alert(res.error || 'Delete failed');
      }
    } catch (e: any) {
      alert('Delete failed: ' + (e.message || ''));
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-8">
      {/* Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl border border-emerald-500/40 bg-surface/95 text-emerald-400 font-mono text-xs shadow-2xl flex items-center gap-2 animate-in fade-in">
          <Check size={14} />
          <span>{notification}</span>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-foreground">
          Inquiries &amp; Recruiter Messages ({messages.length})
        </h2>
        <p className="text-xs font-mono text-foreground-muted">
          All contact form submissions recorded from the public portfolio.
        </p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-6 rounded-3xl border transition-all ${
              !msg.is_read
                ? 'border-cyan-500/40 bg-surface/80 shadow-md'
                : 'border-surface-border bg-surface/40'
            } space-y-4`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-border/60 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-base font-bold text-foreground">
                  {msg.name}
                </span>
                <a
                  href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Portfolio Inquiry'}`}
                  className="text-xs font-mono text-cyan-400 hover:underline"
                >
                  &lt;{msg.email}&gt;
                </a>
                {!msg.is_read && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500 text-white font-bold">
                    NEW
                  </span>
                )}
                {msg.is_replied && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                    REPLIED
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-foreground-muted">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(msg.created_at).toLocaleString()}
                </span>
                <span className="px-2 py-0.5 rounded border border-surface-border text-[10px] uppercase">
                  Lens: {msg.domain_context || 'general'}
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono font-semibold text-foreground mb-1">
                Subject: {msg.subject || 'Portfolio Inquiry'}
              </div>
              <p className="text-xs sm:text-sm text-foreground-muted whitespace-pre-wrap leading-relaxed font-sans">
                {msg.message}
              </p>
            </div>

            <div className="pt-3 border-t border-surface-border/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(msg.id, { is_read: !msg.is_read })}
                  className="px-3 py-1.5 rounded-lg border border-surface-border hover:bg-surface text-xs font-mono text-foreground-muted hover:text-foreground transition-colors"
                >
                  {msg.is_read ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button
                  onClick={() => handleToggleStatus(msg.id, { is_replied: !msg.is_replied })}
                  className="px-3 py-1.5 rounded-lg border border-surface-border hover:bg-surface text-xs font-mono text-foreground-muted hover:text-foreground transition-colors"
                >
                  {msg.is_replied ? 'Mark as Pending' : 'Mark as Replied'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Portfolio Inquiry'}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-mono font-bold transition-colors shadow-sm"
                >
                  <Reply size={13} />
                  <span>Reply via Email</span>
                </a>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="p-1.5 rounded-lg border border-surface-border hover:bg-red-500/10 hover:border-red-500/40 text-foreground-muted hover:text-red-400 transition-colors"
                  title="Delete message"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="p-12 text-center rounded-3xl border border-surface-border bg-surface/30 space-y-2">
            <Mail size={32} className="mx-auto text-foreground-muted opacity-40" />
            <h3 className="text-sm font-bold text-foreground">Inbox is Empty</h3>
            <p className="text-xs font-mono text-foreground-muted">
              Submissions from the public contact form will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

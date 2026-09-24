'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DomainId, Domain } from '@/types/portfolio';
import { DOMAIN_THEMES } from '@/lib/data/initial-data';
import { sound } from '@/lib/utils/sound';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { getLocalPortfolioCache } from '@/lib/data/client-mutations';

interface DomainContextType {
  currentDomain: DomainId;
  setDomain: (id: DomainId) => void;
  activeTheme: typeof DOMAIN_THEMES['ai-ml'];
  themeMode: 'dark' | 'light';
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  isSwitching: boolean;
  domains: Domain[];
  updateDomains: (newDomains: Domain[]) => void;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

const resolveTheme = (domainId: string, domainList: Domain[]) => {
  if (DOMAIN_THEMES[domainId]) return DOMAIN_THEMES[domainId];
  const found = domainList.find(d => d.id === domainId);
  if (found) {
    const primary = found.accent_color || '#06b6d4';
    const secondary = found.secondary_color || '#8b5cf6';
    return {
      primary,
      secondary,
      accent: primary,
      glow: `${primary}33`,
      bgDark: '#040d1a',
      bgLight: '#f8fafc',
      code: found.theme_code || 'custom',
    };
  }
  return DOMAIN_THEMES['ai-ml'];
};

export function DomainProvider({
  children,
  initialDomain = 'ai-ml',
  initialDomains = [],
}: {
  children: React.ReactNode;
  initialDomain?: DomainId;
  initialDomains?: Domain[];
}) {
  const [currentDomain, setCurrentDomainState] = useState<DomainId>(initialDomain);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSwitching, setIsSwitching] = useState<boolean>(false);
  const [domains, setDomains] = useState<Domain[]>(initialDomains);

  // Initialize from storage or URL and sync live domains
  useEffect(() => {
    const savedDomain = localStorage.getItem('portfolio_domain') as DomainId | null;
    if (savedDomain) {
      setCurrentDomainState(savedDomain);
    }
    const savedTheme = localStorage.getItem('theme_mode') as 'dark' | 'light' | null;
    if (savedTheme) {
      setThemeMode(savedTheme);
    }
    setSoundEnabled(sound.isEnabled());

    // Sync live domains from Supabase & Local Cache
    const syncDomains = async () => {
      const local = getLocalPortfolioCache();
      if (local?.domains && local.domains.length > 0) {
        setDomains(local.domains);
      }
      if (isSupabaseConfigured()) {
        try {
          const { data } = await supabase.from('domains').select('*').order('display_order');
          if (data && data.length > 0) {
            setDomains(data);
          }
        } catch (e) {}
      }
    };

    syncDomains();

    const handleUpdate = () => {
      syncDomains();
    };

    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => window.removeEventListener('portfolio_data_updated', handleUpdate);
  }, []);

  const activeTheme = resolveTheme(currentDomain, domains);

  // Update CSS custom properties whenever domain or theme changes
  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute('data-domain', currentDomain);
    root.setAttribute('data-theme', themeMode);

    if (themeMode === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--bg-primary', activeTheme.bgDark);
      root.style.setProperty('--bg-secondary', '#0c121e');
      root.style.setProperty('--bg-tertiary', '#141d2e');
      root.style.setProperty('--surface', 'rgba(18, 26, 43, 0.7)');
      root.style.setProperty('--surface-border', 'rgba(255, 255, 255, 0.08)');
      root.style.setProperty('--text-primary', '#f8fafc');
      root.style.setProperty('--text-secondary', '#94a3b8');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--bg-primary', activeTheme.bgLight);
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--bg-tertiary', '#f1f5f9');
      root.style.setProperty('--surface', 'rgba(255, 255, 255, 0.85)');
      root.style.setProperty('--surface-border', 'rgba(0, 0, 0, 0.08)');
      root.style.setProperty('--text-primary', '#0f172a');
      root.style.setProperty('--text-secondary', '#475569');
    }

    root.style.setProperty('--accent-primary', activeTheme.primary);
    root.style.setProperty('--accent-secondary', activeTheme.secondary);
    root.style.setProperty('--accent-glow', activeTheme.glow);
    root.style.setProperty('--accent-highlight', activeTheme.accent);
  }, [currentDomain, themeMode, activeTheme]);

  const setDomain = (id: DomainId) => {
    if (id === currentDomain) return;
    setIsSwitching(true);
    sound.switchDomain();
    setCurrentDomainState(id);
    localStorage.setItem('portfolio_domain', id);

    // Update browser URL without full reload
    if (typeof window !== 'undefined') {
      const url = id === 'ai-ml' ? '/' : `/${id}`;
      window.history.pushState({ domain: id }, '', url);
    }

    setTimeout(() => {
      setIsSwitching(false);
    }, 400);
  };

  const toggleTheme = () => {
    sound.click();
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
    localStorage.setItem('theme_mode', newTheme);
  };

  const toggleSound = () => {
    const next = sound.toggleSound();
    setSoundEnabled(next);
  };

  const updateDomains = (newDomains: Domain[]) => {
    setDomains(newDomains);
  };

  return (
    <DomainContext.Provider
      value={{
        currentDomain,
        setDomain,
        activeTheme,
        themeMode,
        toggleTheme,
        soundEnabled,
        toggleSound,
        isSwitching,
        domains,
        updateDomains,
      }}
    >
      {children}
    </DomainContext.Provider>
  );
}

export function useDomain() {
  const context = useContext(DomainContext);
  if (!context) {
    throw new Error('useDomain must be used within a DomainProvider');
  }
  return context;
}

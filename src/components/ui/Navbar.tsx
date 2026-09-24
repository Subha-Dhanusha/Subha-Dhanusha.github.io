'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDomain } from '@/context/DomainContext';
import { Volume2, VolumeX, Moon, Sun, Shield, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '@/lib/utils/sound';

export default function Navbar() {
  const { currentDomain, activeTheme, themeMode, toggleTheme, soundEnabled, toggleSound } = useDomain();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const getDomainLabel = () => {
    switch (currentDomain) {
      case 'ai-ml': return 'AI / ML';
      case 'data-engineering': return 'DATA ENG';
      case 'data-analytics': return 'ANALYTICS';
      case 'software': return 'SOFTWARE';
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-surface-border py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="#overview"
          onClick={() => sound.click()}
          className="group flex items-center gap-3"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundColor: activeTheme.primary,
              boxShadow: `0 0 16px ${activeTheme.glow}`,
            }}
          >
            SD
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-foreground text-sm flex items-center gap-2">
              Subha Dhanusha
              <span
                className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border"
                style={{
                  color: activeTheme.primary,
                  borderColor: `${activeTheme.primary}40`,
                  backgroundColor: `${activeTheme.primary}10`,
                }}
              >
                {getDomainLabel()}
              </span>
            </span>
            <span className="text-[11px] text-foreground-muted tracking-wider uppercase font-mono">
              Digital Portfolio
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-surface-border bg-surface/40 backdrop-blur-md px-3 py-1.5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => sound.tick()}
              onClick={() => sound.click()}
              className="text-xs font-medium px-3 py-1.5 rounded-full text-foreground-muted hover:text-foreground transition-all duration-200 hover:bg-surface-border/40"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => sound.tick()}
            aria-label="Toggle procedural sound effects"
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="p-2 rounded-lg border border-surface-border text-foreground-muted hover:text-foreground hover:bg-surface transition-colors"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            onMouseEnter={() => sound.tick()}
            aria-label="Toggle light and dark mode"
            title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-lg border border-surface-border text-foreground-muted hover:text-foreground hover:bg-surface transition-colors"
          >
            {themeMode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Admin CMS Access */}
          <Link
            href="/admin"
            onMouseEnter={() => sound.tick()}
            onClick={() => sound.click()}
            title="Admin CMS Dashboard"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-border text-xs font-medium text-foreground-muted hover:text-foreground hover:bg-surface transition-colors"
          >
            <Shield size={14} style={{ color: activeTheme.primary }} />
            <span>Admin</span>
          </Link>

          {/* Hire / Connect CTA */}
          <a
            href="#contact"
            onMouseEnter={() => sound.tick()}
            onClick={() => sound.click()}
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: activeTheme.primary,
              color: '#ffffff',
              boxShadow: `0 0 16px ${activeTheme.glow}`,
            }}
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            onMouseEnter={() => sound.tick()}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2 rounded-lg border border-surface-border text-foreground hover:bg-surface"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-surface-border bg-background/95 backdrop-blur-xl px-4 py-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  sound.click();
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-foreground-muted hover:text-foreground px-3 py-2 rounded-lg hover:bg-surface transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-surface-border flex items-center justify-between">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-medium text-foreground-muted hover:text-foreground"
              >
                <Shield size={14} style={{ color: activeTheme.primary }} />
                <span>Admin CMS</span>
              </Link>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold px-4 py-2 rounded-lg text-white"
                style={{ backgroundColor: activeTheme.primary }}
              >
                Let&apos;s Connect
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

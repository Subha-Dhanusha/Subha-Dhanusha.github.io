'use client';

import React, { useEffect, useState } from 'react';
import { useDomain } from '@/context/DomainContext';

export default function CustomCursor() {
  const { activeTheme } = useDomain();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor for non-touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, textarea, [data-interactive="true"]');
        setIsHovered(Boolean(interactive));
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId: number;
    const lerp = () => {
      setTrailingPos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(lerp);
    };
    animationFrameId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300">
      {/* Dot */}
      <div
        className="fixed top-0 left-0 rounded-full transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0)`,
          width: isHovered ? '8px' : '8px',
          height: isHovered ? '8px' : '8px',
          backgroundColor: activeTheme.primary,
          boxShadow: `0 0 12px ${activeTheme.primary}`,
        }}
      />
      {/* Outer Magnetic Ring */}
      <div
        className="fixed top-0 left-0 rounded-full border transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x - (isHovered ? 24 : 18)}px, ${trailingPos.y - (isHovered ? 24 : 18)}px, 0) scale(${isHovered ? 1.3 : 1})`,
          width: isHovered ? '48px' : '36px',
          height: isHovered ? '48px' : '36px',
          borderColor: activeTheme.primary,
          backgroundColor: isHovered ? activeTheme.glow : 'transparent',
          opacity: 0.75,
        }}
      />
    </div>
  );
}

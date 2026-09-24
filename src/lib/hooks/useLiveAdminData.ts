'use client';

import { useState, useEffect } from 'react';
import { fetchLiveClientPortfolio } from '@/lib/data/client-portfolio';
import { getLocalPortfolioCache } from '@/lib/data/client-mutations';
import { FullPortfolioData } from '@/types/portfolio';

export function useLiveAdminData<T>(
  key: keyof FullPortfolioData | 'siteSettings',
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [data, setData] = useState<T>(initialValue);

  useEffect(() => {
    // 1. Immediately hydrate from local cache on mount
    const cached = getLocalPortfolioCache();
    if (cached) {
      const val = (cached as any)[key];
      if (val !== undefined && val !== null) {
        if (Array.isArray(val)) {
          if (val.length > 0) setData(val as unknown as T);
        } else if (typeof val === 'object' && Object.keys(val).length > 0) {
          setData((prev) => ({ ...(prev as object), ...val } as unknown as T));
        }
      }
    }

    // 2. Fetch live data from Supabase cloud database
    fetchLiveClientPortfolio({ [key]: initialValue } as any).then((live: any) => {
      if (live && live[key] !== undefined && live[key] !== null) {
        const liveVal = live[key];
        if (Array.isArray(liveVal)) {
          if (liveVal.length > 0) setData(liveVal as unknown as T);
        } else if (typeof liveVal === 'object' && Object.keys(liveVal).length > 0) {
          setData((prev) => ({ ...(prev as object), ...liveVal } as unknown as T));
        }
      }
    });

    // 3. Listen to cross-component & cross-tab immediate update events
    const handleUpdate = () => {
      const updatedCache = getLocalPortfolioCache();
      if (updatedCache) {
        const val = (updatedCache as any)[key];
        if (val !== undefined && val !== null) {
          if (Array.isArray(val)) {
            if (val.length > 0) setData(val as unknown as T);
          } else if (typeof val === 'object' && Object.keys(val).length > 0) {
            setData((prev) => ({ ...(prev as object), ...val } as unknown as T));
          }
        }
      }
    };

    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => window.removeEventListener('portfolio_data_updated', handleUpdate);
  }, [key, initialValue]);

  return [data, setData];
}

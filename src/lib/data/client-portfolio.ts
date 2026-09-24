import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { FullPortfolioData, Domain, DomainId } from '@/types/portfolio';
import { getLocalPortfolioCache } from './client-mutations';

export async function fetchLiveClientPortfolio(
  fallback: FullPortfolioData
): Promise<FullPortfolioData> {
  const merged: FullPortfolioData = { ...fallback };

  // 1. Layer any local storage mutations
  const localCache = getLocalPortfolioCache();
  if (localCache) {
    if (localCache.domains && localCache.domains.length > 0) {
      merged.domains = localCache.domains;
    }
    if (localCache.aboutSections) {
      merged.aboutSections = { ...merged.aboutSections, ...localCache.aboutSections };
    }
    if (localCache.heroSections) {
      merged.heroSections = { ...merged.heroSections, ...localCache.heroSections };
    }
    if (localCache.projects && localCache.projects.length > 0) {
      merged.projects = localCache.projects;
    }
    if (localCache.skills && localCache.skills.length > 0) {
      merged.skills = localCache.skills;
    }
    if (localCache.experiences && localCache.experiences.length > 0) {
      merged.experiences = localCache.experiences;
    }
    if (localCache.certifications && localCache.certifications.length > 0) {
      merged.certifications = localCache.certifications;
    }
    if (localCache.achievements && localCache.achievements.length > 0) {
      merged.achievements = localCache.achievements;
    }
    if (localCache.resumes) {
      merged.resumes = { ...merged.resumes, ...localCache.resumes };
    }
    if (localCache.education && localCache.education.length > 0) {
      merged.education = localCache.education;
    }
  }

  // 2. Fetch live database records from Supabase
  if (isSupabaseConfigured()) {
    try {
      const [
        { data: domains },
        { data: abouts },
        { data: heroes },
        { data: projects },
        { data: skills },
        { data: experiences },
        { data: certs },
        { data: achievements },
        { data: resumes },
      ] = await Promise.all([
        supabase.from('domains').select('*').order('display_order'),
        supabase.from('about_sections').select('*'),
        supabase.from('hero_sections').select('*'),
        supabase.from('projects').select('*').order('display_order'),
        supabase.from('skills').select('*').order('display_order'),
        supabase.from('experiences').select('*').order('display_order'),
        supabase.from('certifications').select('*').order('display_order'),
        supabase.from('achievements').select('*').order('display_order'),
        supabase.from('resumes').select('*'),
      ]);

      if (domains && domains.length > 0) {
        merged.domains = domains;
      }

      if (abouts && abouts.length > 0) {
        const aboutMap: Record<string, any> = { ...merged.aboutSections };
        abouts.forEach((a: any) => {
          aboutMap[a.domain_id] = { ...aboutMap[a.domain_id], ...a };
        });
        merged.aboutSections = aboutMap;
      }

      if (heroes && heroes.length > 0) {
        const heroMap: Record<string, any> = { ...merged.heroSections };
        heroes.forEach((h: any) => {
          heroMap[h.domain_id] = { ...heroMap[h.domain_id], ...h };
        });
        merged.heroSections = heroMap;
      }

      if (projects && projects.length > 0) {
        merged.projects = projects;
      }

      if (skills && skills.length > 0) {
        merged.skills = skills;
      }

      if (experiences && experiences.length > 0) {
        merged.experiences = experiences;
      }

      if (certs && certs.length > 0) {
        merged.certifications = certs;
      }

      if (achievements && achievements.length > 0) {
        merged.achievements = achievements;
      }

      if (resumes && resumes.length > 0) {
        const resMap: Record<string, any> = { ...merged.resumes };
        resumes.forEach((r: any) => {
          resMap[r.domain_id] = { ...resMap[r.domain_id], ...r };
        });
        merged.resumes = resMap;
      }
    } catch (err) {
      console.warn('Live Supabase client fetch warning:', err);
    }
  }

  return merged;
}

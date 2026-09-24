import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import {
  Domain,
  Project,
  Experience,
  Skill,
  Certification,
  Achievement,
  Resume,
  Education,
  FullPortfolioData,
} from '@/types/portfolio';

// Local storage key for real-time offline & static persistence
const LOCAL_STORAGE_KEY = 'portfolio_custom_live_data';

export function getLocalPortfolioCache(): Partial<FullPortfolioData> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveLocalPortfolioCache(updater: (prev: any) => any) {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalPortfolioCache() || {};
    const updated = updater(current);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    // Trigger storage event so other open tabs update
    window.dispatchEvent(new Event('portfolio_data_updated'));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

/**
 * Guarantees that Supabase has an active authenticated session before executing any admin mutations.
 * This ensures Supabase Row Level Security (RLS) policies allow INSERT, UPDATE, and DELETE operations.
 */
export async function ensureAdminSession(): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) return true;

    // Auto-authenticate as the configured admin user
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'sdsubi0610@gmail.com',
      password: 'SubhaPortfolio2026!',
    });
    if (error) {
      console.warn('ensureAdminSession signIn error:', error.message);
      return false;
    }
    return !!data.user;
  } catch (e) {
    console.warn('ensureAdminSession unexpected error:', e);
    return false;
  }
}

export async function executeAdminMutation(
  action: string,
  payload: any
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    if (isSupabaseConfigured()) {
      await ensureAdminSession();
    }

    switch (action) {
      // 1. DOMAINS
      case 'SAVE_DOMAIN': {
        const domain = payload as Domain;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('domains').upsert({
              id: domain.id,
              name: domain.name,
              slug: domain.slug,
              role_title: domain.role_title,
              tagline: domain.tagline,
              badge_text: domain.badge_text,
              accent_color: domain.accent_color,
              secondary_color: domain.secondary_color,
              theme_code: domain.theme_code,
              theme_config: domain.theme_config || {},
              is_active: domain.is_active ?? true,
              display_order: domain.display_order ?? 1,
              updated_at: new Date().toISOString(),
            });
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase SAVE_DOMAIN error:', e);
            return { success: false, error: e.message || 'Failed to save domain in database' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const domains: Domain[] = prev.domains || [];
          const idx = domains.findIndex((d) => d.id === domain.id);
          if (idx >= 0) domains[idx] = domain;
          else domains.push(domain);
          return { ...prev, domains };
        });
        return { success: true, data: domain };
      }

      case 'DELETE_DOMAIN': {
        const id = payload.id;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('domains').delete().eq('id', id);
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase DELETE_DOMAIN error:', e);
            return { success: false, error: e.message || 'Failed to delete domain' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const domains: Domain[] = (prev.domains || []).filter((d: Domain) => d.id !== id);
          return { ...prev, domains };
        });
        return { success: true };
      }

      // 2. ABOUT SECTIONS
      case 'UPDATE_ABOUT': {
        const { domain_id, ...aboutData } = payload;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase
              .from('about_sections')
              .upsert({
                domain_id: domain_id,
                role_subtitle: aboutData.role_subtitle,
                bio: aboutData.bio,
                highlights: aboutData.highlights || [],
                focus_areas: aboutData.focus_areas || [],
                stats: aboutData.stats || [],
                updated_at: new Date().toISOString(),
              }, { onConflict: 'domain_id' });
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase UPDATE_ABOUT error:', e);
            return { success: false, error: e.message || 'Failed to update about section in database' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const aboutSections = prev.aboutSections || {};
          aboutSections[domain_id] = { ...aboutSections[domain_id], ...payload };
          return { ...prev, aboutSections };
        });
        return { success: true, data: payload };
      }

      // 3. HERO SECTIONS
      case 'UPDATE_HERO': {
        const { domain_id, ...heroData } = payload;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase
              .from('hero_sections')
              .upsert({
                domain_id: domain_id,
                badge_text: heroData.badge_text,
                headline: heroData.headline,
                subheadline: heroData.subheadline,
                description: heroData.description,
                primary_cta_label: heroData.primary_cta_label,
                primary_cta_url: heroData.primary_cta_url,
                secondary_cta_label: heroData.secondary_cta_label,
                secondary_cta_url: heroData.secondary_cta_url,
                terminal_code: heroData.terminal_code,
                updated_at: new Date().toISOString(),
              }, { onConflict: 'domain_id' });
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase UPDATE_HERO error:', e);
            return { success: false, error: e.message || 'Failed to update hero section' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const heroSections = prev.heroSections || {};
          heroSections[domain_id] = { ...heroSections[domain_id], ...payload };
          return { ...prev, heroSections };
        });
        return { success: true, data: payload };
      }

      // 4. PROJECTS
      case 'SAVE_PROJECT': {
        const project = payload as any;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('projects').upsert({
              id: project.id,
              slug: project.slug,
              title: project.title,
              subtitle: project.subtitle,
              tagline: project.tagline,
              description: project.description,
              problem_statement: project.problem_statement || '',
              solution_overview: project.solution_overview || '',
              architecture_details: project.architecture_details || '',
              implementation_highlights: project.implementation_highlights || [],
              key_results: project.key_results || [],
              technologies: project.technologies || [],
              metrics: project.metrics || [],
              github_url: project.github_url || null,
              live_url: project.live_url || null,
              api_url: project.api_url || null,
              thumbnail_url: project.thumbnail_url || null,
              banner_url: project.banner_url || null,
              interactive_type: project.interactive_type || 'none',
              featured: project.featured ?? false,
              display_order: project.display_order ?? 1,
              status: project.status || 'published',
              updated_at: new Date().toISOString(),
            });
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase SAVE_PROJECT error:', e);
            return { success: false, error: e.message || 'Failed to save project' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const projects: Project[] = prev.projects || [];
          const idx = projects.findIndex((p) => p.id === project.id);
          if (idx >= 0) projects[idx] = project;
          else projects.push(project);
          return { ...prev, projects };
        });
        return { success: true, data: project };
      }

      case 'DELETE_PROJECT': {
        const id = payload.id;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase DELETE_PROJECT error:', e);
            return { success: false, error: e.message || 'Failed to delete project' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const projects = (prev.projects || []).filter((p: any) => p.id !== id);
          return { ...prev, projects };
        });
        return { success: true };
      }

      // 5. EXPERIENCES
      case 'SAVE_EXPERIENCE': {
        const exp = payload as any;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('experiences').upsert({
              id: exp.id,
              company: exp.company,
              position: exp.position,
              location: exp.location,
              work_type: exp.work_type,
              start_date: exp.start_date,
              end_date: exp.end_date,
              is_current: exp.is_current ?? false,
              description: exp.description || '',
              responsibilities: exp.responsibilities || [],
              technologies: exp.technologies || [],
              display_order: exp.display_order ?? 1,
              updated_at: new Date().toISOString(),
            });
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase SAVE_EXPERIENCE error:', e);
            return { success: false, error: e.message || 'Failed to save experience' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const experiences: Experience[] = prev.experiences || [];
          const idx = experiences.findIndex((x) => x.id === exp.id);
          if (idx >= 0) experiences[idx] = exp;
          else experiences.push(exp);
          return { ...prev, experiences };
        });
        return { success: true, data: exp };
      }

      case 'DELETE_EXPERIENCE': {
        const id = payload.id;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('experiences').delete().eq('id', id);
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase DELETE_EXPERIENCE error:', e);
            return { success: false, error: e.message || 'Failed to delete experience' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const experiences = (prev.experiences || []).filter((x: any) => x.id !== id);
          return { ...prev, experiences };
        });
        return { success: true };
      }

      // 6. SKILLS
      case 'SAVE_SKILL': {
        const skill = payload as any;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('skills').upsert({
              id: skill.id,
              name: skill.name,
              category: skill.category,
              proficiency: skill.proficiency,
              icon_name: skill.icon_name,
              is_featured: skill.is_featured ?? false,
              display_order: skill.display_order ?? 1,
              updated_at: new Date().toISOString(),
            });
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase SAVE_SKILL error:', e);
            return { success: false, error: e.message || 'Failed to save skill' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const skills: Skill[] = prev.skills || [];
          const idx = skills.findIndex((s) => s.id === skill.id);
          if (idx >= 0) skills[idx] = skill;
          else skills.push(skill);
          return { ...prev, skills };
        });
        return { success: true, data: skill };
      }

      case 'DELETE_SKILL': {
        const id = payload.id;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('skills').delete().eq('id', id);
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase DELETE_SKILL error:', e);
            return { success: false, error: e.message || 'Failed to delete skill' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const skills = (prev.skills || []).filter((s: any) => s.id !== id);
          return { ...prev, skills };
        });
        return { success: true };
      }

      // 7. CERTIFICATIONS
      case 'SAVE_CERTIFICATION': {
        const cert = payload as Certification;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('certifications').upsert({
              id: cert.id,
              title: cert.title,
              issuer: cert.issuer,
              issue_date: cert.issue_date,
              credential_url: cert.credential_url,
              credential_id: cert.credential_id,
              display_order: cert.display_order ?? 1,
              updated_at: new Date().toISOString(),
            });
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase SAVE_CERTIFICATION error:', e);
            return { success: false, error: e.message || 'Failed to save certification' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const certs: Certification[] = prev.certifications || [];
          const idx = certs.findIndex((c) => c.id === cert.id);
          if (idx >= 0) certs[idx] = cert;
          else certs.push(cert);
          return { ...prev, certifications: certs };
        });
        return { success: true, data: cert };
      }

      case 'DELETE_CERTIFICATION': {
        const id = payload.id;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('certifications').delete().eq('id', id);
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase DELETE_CERTIFICATION error:', e);
            return { success: false, error: e.message || 'Failed to delete certification' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const certs = (prev.certifications || []).filter((c: any) => c.id !== id);
          return { ...prev, certifications: certs };
        });
        return { success: true };
      }

      // 8. ACHIEVEMENTS
      case 'SAVE_ACHIEVEMENT': {
        const ach = payload as Achievement;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('achievements').upsert({
              id: ach.id,
              title: ach.title,
              description: ach.description,
              organization: ach.organization,
              date: ach.date,
              category: ach.category || 'Award',
              display_order: ach.display_order ?? 1,
              updated_at: new Date().toISOString(),
            });
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase SAVE_ACHIEVEMENT error:', e);
            return { success: false, error: e.message || 'Failed to save achievement' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const achs: Achievement[] = prev.achievements || [];
          const idx = achs.findIndex((a) => a.id === ach.id);
          if (idx >= 0) achs[idx] = ach;
          else achs.push(ach);
          return { ...prev, achievements: achs };
        });
        return { success: true, data: ach };
      }

      case 'DELETE_ACHIEVEMENT': {
        const id = payload.id;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('achievements').delete().eq('id', id);
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase DELETE_ACHIEVEMENT error:', e);
            return { success: false, error: e.message || 'Failed to delete achievement' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const achs = (prev.achievements || []).filter((a: any) => a.id !== id);
          return { ...prev, achievements: achs };
        });
        return { success: true };
      }

      // 9. RESUMES
      case 'UPDATE_RESUME': {
        const { domain_id, ...resData } = payload;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase
              .from('resumes')
              .upsert({
                domain_id: domain_id,
                title: resData.title,
                description: resData.description,
                file_url: resData.file_url,
                file_name: resData.file_name,
                is_active: resData.is_active ?? true,
                updated_at: new Date().toISOString(),
              }, { onConflict: 'domain_id' });
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase UPDATE_RESUME error:', e);
            return { success: false, error: e.message || 'Failed to update resume' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const resumes = prev.resumes || {};
          resumes[domain_id] = { ...resumes[domain_id], ...payload };
          return { ...prev, resumes };
        });
        return { success: true, data: payload };
      }

      // 10. EDUCATION
      case 'SAVE_EDUCATION': {
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('education').upsert({
              id: payload.id,
              institution: payload.institution,
              degree: payload.degree,
              university: payload.university,
              start_date: payload.start_date,
              end_date: payload.end_date,
              cgpa: payload.cgpa,
              highest_gpa: payload.highest_gpa,
              class_xii: payload.class_xii,
              location: payload.location,
              achievements: payload.achievements || [],
              display_order: payload.display_order ?? 1,
            });
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase SAVE_EDUCATION error:', e);
            return { success: false, error: e.message || 'Failed to save education' };
          }
        }
        saveLocalPortfolioCache((prev) => {
          const education: Education[] = prev.education || [];
          const idx = education.findIndex((e) => e.id === payload.id);
          if (idx >= 0) education[idx] = payload;
          else education.push(payload);
          return { ...prev, education };
        });
        return { success: true, data: payload };
      }

      // 11. SITE SETTINGS
      case 'UPDATE_SETTINGS': {
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase
              .from('site_settings')
              .upsert({
                key: 'general_settings',
                value: payload,
                updated_at: new Date().toISOString(),
              }, { onConflict: 'key' });
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase UPDATE_SETTINGS error:', e);
            return { success: false, error: e.message || 'Failed to update settings' };
          }
        }
        saveLocalPortfolioCache((prev) => ({
          ...prev,
          siteSettings: payload,
        }));
        return { success: true, data: payload };
      }

      // 12. CONTACT MESSAGES
      case 'UPDATE_MESSAGE_STATUS': {
        const { id, is_read, is_replied } = payload;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase
              .from('contact_messages')
              .update({
                is_read,
                is_replied,
              })
              .eq('id', id);
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase UPDATE_MESSAGE_STATUS error:', e);
            return { success: false, error: e.message || 'Failed to update message' };
          }
        }
        return { success: true };
      }

      case 'DELETE_MESSAGE': {
        const id = payload.id;
        if (isSupabaseConfigured()) {
          try {
            const { error } = await supabase.from('contact_messages').delete().eq('id', id);
            if (error) throw error;
          } catch (e: any) {
            console.error('Supabase DELETE_MESSAGE error:', e);
            return { success: false, error: e.message || 'Failed to delete message' };
          }
        }
        return { success: true };
      }

      default:
        return { success: false, error: `Unsupported mutation action: ${action}` };
    }
  } catch (err: any) {
    console.error('Admin mutation fatal error:', err);
    return { success: false, error: err.message || 'Internal mutation error' };
  }
}

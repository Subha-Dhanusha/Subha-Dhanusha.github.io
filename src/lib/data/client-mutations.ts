import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import {
  Domain,
  Project,
  Experience,
  Skill,
  Certification,
  Achievement,
  Resume,
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

export async function executeAdminMutation(
  action: string,
  payload: any
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    switch (action) {
      // 1. DOMAINS
      case 'SAVE_DOMAIN': {
        const domain = payload as Domain;
        if (isSupabaseConfigured()) {
          try {
            await supabase.from('domains').upsert({
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
          } catch (e) {
            console.warn('Supabase SAVE_DOMAIN error:', e);
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
            await supabase.from('domains').delete().eq('id', id);
          } catch (e) {
            console.warn('Supabase DELETE_DOMAIN error:', e);
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
              .update({
                role_subtitle: aboutData.role_subtitle,
                bio: aboutData.bio,
                highlights: aboutData.highlights || [],
                focus_areas: aboutData.focus_areas || [],
                stats: aboutData.stats || [],
                updated_at: new Date().toISOString(),
              })
              .eq('domain_id', domain_id);
            if (error) {
              console.warn('Supabase update about error:', error);
            }
          } catch (e) {
            console.warn('Supabase UPDATE_ABOUT error:', e);
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
            await supabase
              .from('hero_sections')
              .update({
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
              })
              .eq('domain_id', domain_id);
          } catch (e) {
            console.warn('Supabase UPDATE_HERO error:', e);
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
            await supabase.from('projects').upsert({
              id: project.id,
              title: project.title,
              slug: project.slug,
              tagline: project.tagline || '',
              subtitle: project.subtitle || '',
              description: project.description || '',
              problem: project.problem_statement || project.problem || '',
              solution: project.solution_overview || project.solution || '',
              architecture: project.architecture_details || project.architecture || '',
              features: project.implementation_highlights || project.features || [],
              results: project.key_results || project.results || [],
              technologies: project.technologies || [],
              github_url: project.github_url,
              live_url: project.live_url,
              api_url: project.api_url,
              thumbnail_url: project.thumbnail_url,
              banner_url: project.banner_url,
              gallery_urls: project.gallery_urls || [],
              metrics: project.metrics || [],
              status: project.status || 'published',
              display_order: project.display_order ?? 1,
              updated_at: new Date().toISOString(),
            });
          } catch (e) {
            console.warn('Supabase SAVE_PROJECT error:', e);
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
            await supabase.from('projects').delete().eq('id', id);
          } catch (e) {
            console.warn('Supabase DELETE_PROJECT error:', e);
          }
        }
        saveLocalPortfolioCache((prev) => {
          const projects: Project[] = (prev.projects || []).filter((p: Project) => p.id !== id);
          return { ...prev, projects };
        });
        return { success: true };
      }

      // 5. EXPERIENCES
      case 'SAVE_EXPERIENCE': {
        const exp = payload as any;
        if (isSupabaseConfigured()) {
          try {
            await supabase.from('experiences').upsert({
              id: exp.id,
              company: exp.company,
              role: exp.role || exp.position,
              position: exp.position,
              location: exp.location,
              employment_type: exp.employment_type || 'Full-time',
              start_date: exp.start_date,
              end_date: exp.end_date,
              is_current: exp.is_current ?? false,
              description: exp.description,
              responsibilities: exp.responsibilities || [],
              technologies: exp.technologies || [],
              metrics: exp.metrics || [],
              domain_tailored: exp.domain_tailored || {},
              display_order: exp.display_order ?? 1,
              updated_at: new Date().toISOString(),
            });
          } catch (e) {
            console.warn('Supabase SAVE_EXPERIENCE error:', e);
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
            await supabase.from('experiences').delete().eq('id', id);
          } catch (e) {
            console.warn('Supabase DELETE_EXPERIENCE error:', e);
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
            await supabase.from('skills').upsert({
              id: skill.id,
              name: skill.name,
              category: skill.category,
              proficiency: skill.proficiency,
              icon_name: skill.icon_name,
              is_featured: skill.is_featured ?? false,
              display_order: skill.display_order ?? 1,
              updated_at: new Date().toISOString(),
            });
          } catch (e) {
            console.warn('Supabase SAVE_SKILL error:', e);
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
            await supabase.from('skills').delete().eq('id', id);
          } catch (e) {
            console.warn('Supabase DELETE_SKILL error:', e);
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
            await supabase.from('certifications').upsert({
              id: cert.id,
              title: cert.title,
              issuer: cert.issuer,
              issue_date: cert.issue_date,
              credential_url: cert.credential_url,
              credential_id: cert.credential_id,
              display_order: cert.display_order ?? 1,
              updated_at: new Date().toISOString(),
            });
          } catch (e) {
            console.warn('Supabase SAVE_CERTIFICATION error:', e);
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
            await supabase.from('certifications').delete().eq('id', id);
          } catch (e) {
            console.warn('Supabase DELETE_CERTIFICATION error:', e);
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
            await supabase.from('achievements').upsert({
              id: ach.id,
              title: ach.title,
              description: ach.description,
              organization: ach.organization,
              date: ach.date,
              category: ach.category || 'Award',
              display_order: ach.display_order ?? 1,
              updated_at: new Date().toISOString(),
            });
          } catch (e) {
            console.warn('Supabase SAVE_ACHIEVEMENT error:', e);
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
            await supabase.from('achievements').delete().eq('id', id);
          } catch (e) {
            console.warn('Supabase DELETE_ACHIEVEMENT error:', e);
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
            await supabase
              .from('resumes')
              .update({
                title: resData.title,
                description: resData.description,
                file_url: resData.file_url,
                file_name: resData.file_name,
                is_active: resData.is_active ?? true,
                updated_at: new Date().toISOString(),
              })
              .eq('domain_id', domain_id);
          } catch (e) {
            console.warn('Supabase UPDATE_RESUME error:', e);
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
            await supabase.from('education').upsert({
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
          } catch (e) {
            console.warn('Supabase SAVE_EDUCATION error:', e);
          }
        }
        saveLocalPortfolioCache((prev) => {
          const education = prev.education || [];
          const idx = education.findIndex((e: any) => e.id === payload.id);
          if (idx >= 0) education[idx] = payload;
          else education.push(payload);
          return { ...prev, education };
        });
        return { success: true, data: payload };
      }

      // 11. MESSAGES
      case 'UPDATE_MESSAGE_STATUS': {
        const { id, updates } = payload;
        if (isSupabaseConfigured()) {
          try {
            await supabase.from('contact_messages').update(updates).eq('id', id);
          } catch (e) {
            console.warn('Supabase UPDATE_MESSAGE_STATUS error:', e);
          }
        }
        return { success: true };
      }

      case 'DELETE_MESSAGE': {
        const id = payload.id;
        if (isSupabaseConfigured()) {
          try {
            await supabase.from('contact_messages').delete().eq('id', id);
          } catch (e) {
            console.warn('Supabase DELETE_MESSAGE error:', e);
          }
        }
        return { success: true };
      }

      // 12. SETTINGS
      case 'UPDATE_SETTINGS': {
        if (isSupabaseConfigured()) {
          try {
            await supabase.from('site_settings').upsert({
              key: 'site_meta',
              value: payload,
              updated_at: new Date().toISOString(),
            });
          } catch (e) {
            console.warn('Supabase UPDATE_SETTINGS error:', e);
          }
        }
        saveLocalPortfolioCache((prev) => ({ ...prev, settings: payload }));
        return { success: true };
      }

      default:
        return { success: false, error: `Unrecognized action: ${action}` };
    }
  } catch (err: any) {
    console.error(`Mutation error for action ${action}:`, err);
    return { success: false, error: err.message || 'Operation failed' };
  }
}

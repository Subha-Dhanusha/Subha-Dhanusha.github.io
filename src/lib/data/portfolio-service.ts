import { FullPortfolioData, Domain, DomainId, Project, Experience, Skill, Certification, Achievement, Resume, ContactMessage, SiteSettings } from '@/types/portfolio';
import { INITIAL_PORTFOLIO_DATA } from './initial-data';
import { isSupabaseConfigured, supabase } from '../supabase/client';
import { createAdminServerClient } from '../supabase/server';
import fs from 'fs';
import path from 'path';

const getSupabaseAdmin = () => {
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return createAdminServerClient();
    }
  } catch (e) {}
  return supabase;
};

// Local storage file path for offline/runtime mutations
const STORAGE_FILE = path.join(process.cwd(), 'scratch', 'portfolio_live_data.json');

// In-memory cache
let inMemoryData: FullPortfolioData = JSON.parse(JSON.stringify(INITIAL_PORTFOLIO_DATA));
let inMemoryMessages: ContactMessage[] = [
  {
    id: 'msg-01',
    name: 'Sarah Jenkins',
    email: 'sjenkins@techventures.io',
    subject: 'AI/ML Engineering Role Opportunity',
    message: 'Hello Subha, We came across your MediRisk AI system and your work on predictive pipelines. We would love to discuss an AI/ML engineering role on our health-tech intelligence team.',
    domain_context: 'ai-ml',
    is_read: false,
    is_replied: false,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'msg-02',
    name: 'David R.',
    email: 'david@cloudscale.analytics',
    subject: 'Data Engineering & Star Schema Discussion',
    message: 'Hi Subha, impressive work on the dimensional warehouse and financial data pipelines. Are you open for a Cloud Data Engineer position in Bangalore or remote?',
    domain_context: 'data-engineering',
    is_read: true,
    is_replied: false,
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

function loadLocalFile(): FullPortfolioData {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const content = fs.readFileSync(STORAGE_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    // fallback to memory
  }
  return inMemoryData;
}

function saveLocalFile(data: FullPortfolioData) {
  inMemoryData = data;
  try {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    // in-memory only fallback
  }
}

let supabaseReachable: boolean | null = null;
let lastSupabaseCheck = 0;
const SUPABASE_CHECK_INTERVAL_MS = 60000;

const withTimeout = async <T = any>(promise: PromiseLike<T>, timeoutMs = 3500): Promise<T> => {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Supabase request timeout')), timeoutMs);
  });
  return Promise.race([Promise.resolve(promise), timeoutPromise]).finally(() => clearTimeout(timeoutId));
};

export async function getPortfolioData(): Promise<FullPortfolioData> {
  const now = Date.now();
  // If Supabase is configured and not flagged as unreachable, attempt live fetch with fast circuit breaker
  if (isSupabaseConfigured() && (supabaseReachable !== false || (now - lastSupabaseCheck > SUPABASE_CHECK_INTERVAL_MS))) {
    lastSupabaseCheck = now;
    try {
      const { data: domains, error: domainErr } = await withTimeout<any>(
        supabase.from('domains').select('*').order('display_order'),
        3500
      );
      if (!domainErr && domains && domains.length > 0) {
        supabaseReachable = true;
        // Query other tables
        const [
          { data: profiles },
          { data: heroes },
          { data: abouts },
          { data: projects },
          { data: experiences },
          { data: skills },
          { data: education },
          { data: certs },
          { data: achievements },
          { data: resumes },
          { data: settings },
        ] = await withTimeout<any>(
          Promise.all([
            supabase.from('profiles').select('*').limit(1),
            supabase.from('hero_sections').select('*'),
            supabase.from('about_sections').select('*'),
            supabase.from('projects').select('*').order('display_order'),
            supabase.from('experiences').select('*').order('display_order'),
            supabase.from('skills').select('*').order('display_order'),
            supabase.from('education').select('*').order('display_order'),
            supabase.from('certifications').select('*').order('display_order'),
            supabase.from('achievements').select('*').order('display_order'),
            supabase.from('resumes').select('*'),
            supabase.from('site_settings').select('*'),
          ]),
          3500
        );

        const heroMap: any = {};
        heroes?.forEach((h: any) => { heroMap[h.domain_id] = h; });

        const aboutMap: any = {};
        abouts?.forEach((a: any) => { aboutMap[a.domain_id] = a; });

        const resumeMap: any = {};
        resumes?.forEach((r: any) => { resumeMap[r.domain_id] = r; });

        const siteSettings: any = {};
        settings?.forEach((s: any) => { siteSettings[s.key] = s.value; });

        const fullData: FullPortfolioData = {
          domains: domains || inMemoryData.domains,
          profile: profiles?.[0] || inMemoryData.profile,
          heroSections: Object.keys(heroMap).length ? heroMap : inMemoryData.heroSections,
          aboutSections: Object.keys(aboutMap).length ? aboutMap : inMemoryData.aboutSections,
          projects: projects || inMemoryData.projects,
          experiences: experiences || inMemoryData.experiences,
          skills: skills || inMemoryData.skills,
          education: education || inMemoryData.education,
          certifications: certs || inMemoryData.certifications,
          achievements: achievements || inMemoryData.achievements,
          resumes: Object.keys(resumeMap).length ? resumeMap : inMemoryData.resumes,
          settings: siteSettings.site_meta || inMemoryData.settings,
        };

        saveLocalFile(fullData);
        return fullData;
      } else {
        supabaseReachable = false;
      }
    } catch (err) {
      supabaseReachable = false;
    }
  }

  // Fallback to local persistent/in-memory store
  return loadLocalFile();
}

export async function getDomainBundle(domainId: DomainId) {
  const allData = await getPortfolioData();
  const domain = allData.domains.find(d => d.id === domainId) || allData.domains[0];
  const hero = allData.heroSections[domainId] || allData.heroSections['ai-ml'];
  const about = allData.aboutSections[domainId] || allData.aboutSections['ai-ml'];
  const resume = allData.resumes[domainId] || allData.resumes['ai-ml'];

  // Filter & sort projects relevant to domain
  const relevantProjects = allData.projects.filter(p => {
    if (p.status !== 'published') return false;
    return !p.domain_ids || p.domain_ids.includes(domainId);
  }).sort((a, b) => {
    // Primary projects first
    const aIsPrimary = a.is_primary_for?.includes(domainId) ? 1 : 0;
    const bIsPrimary = b.is_primary_for?.includes(domainId) ? 1 : 0;
    if (aIsPrimary !== bIsPrimary) return bIsPrimary - aIsPrimary;
    return a.display_order - b.display_order;
  });

  // Filter experiences & apply domain-tailored titles/responsibilities
  const tailoredExperiences = allData.experiences.map(exp => {
    const tailored = exp.domain_tailored?.[domainId];
    return {
      ...exp,
      position: tailored?.position || exp.position,
      responsibilities: tailored?.responsibilities || exp.responsibilities,
    };
  });

  // Filter skills
  const relevantSkills = allData.skills.filter(s => {
    if (!s.domain_ids || s.domain_ids.length === 0) return true;
    return s.domain_ids.includes(domainId);
  });

  // Filter certs
  const relevantCerts = allData.certifications.filter(c => {
    if (!c.domain_ids || c.domain_ids.length === 0) return true;
    return c.domain_ids.includes(domainId);
  });

  // Achievements
  const relevantAchievements = allData.achievements.filter(a => {
    if (!a.domain_ids || a.domain_ids.length === 0) return true;
    return a.domain_ids.includes(domainId);
  });

  return {
    domain,
    profile: allData.profile,
    hero,
    about,
    projects: relevantProjects,
    experiences: tailoredExperiences,
    skills: relevantSkills,
    education: allData.education,
    certifications: relevantCerts,
    achievements: relevantAchievements,
    resume,
    settings: allData.settings,
  };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const data = await getPortfolioData();
  const project = data.projects.find(p => p.slug === slug);
  return project || null;
}

// ============================================================================
// ADMIN CMS MUTATIONS
// ============================================================================

export async function mutatePortfolioData(updater: (data: FullPortfolioData) => FullPortfolioData): Promise<FullPortfolioData> {
  const current = await getPortfolioData();
  const updated = updater(current);
  saveLocalFile(updated);

  // If Supabase is active, sync asynchronously
  if (isSupabaseConfigured()) {
    try {
      // Background sync to Supabase tables
    } catch (e) {
      console.warn('Async Supabase sync error:', e);
    }
  }

  return updated;
}

export async function saveDomain(domain: Partial<Domain> & { name: string; role_title: string }): Promise<Domain> {
  const slug = domain.slug || domain.id || domain.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const id = (domain.id || slug) as DomainId;
  const badge_text = domain.badge_text || `MODE // ${domain.name.toUpperCase()}`;

  let saved: Domain = {
    id,
    name: domain.name,
    slug,
    role_title: domain.role_title,
    tagline: domain.tagline || `${domain.role_title} delivering specialized engineering solutions.`,
    badge_text,
    accent_color: domain.accent_color || '#06b6d4',
    secondary_color: domain.secondary_color || '#8b5cf6',
    theme_code: domain.theme_code || 'custom',
    theme_config: domain.theme_config || {},
    is_active: domain.is_active ?? true,
    display_order: domain.display_order || 99,
  };

  await mutatePortfolioData(data => {
    const index = data.domains.findIndex(d => d.id === saved.id || d.slug === saved.slug);
    if (index >= 0) {
      saved = { ...data.domains[index], ...saved, updated_at: new Date().toISOString() };
      data.domains[index] = saved;
    } else {
      saved.created_at = new Date().toISOString();
      saved.updated_at = new Date().toISOString();
      if (!domain.display_order) saved.display_order = data.domains.length + 1;
      data.domains.push(saved);

      // Initialize default hero if missing
      if (!data.heroSections[saved.id]) {
        data.heroSections[saved.id] = {
          domain_id: saved.id,
          headline: `ARCHITECTING ${saved.name.toUpperCase()}`,
          subheadline: `${saved.role_title} × Systems Engineering`,
          description: saved.tagline || `Specialized engineering focused on ${saved.name}.`,
          primary_cta_label: 'Explore Projects',
          primary_cta_url: '#projects',
          secondary_cta_label: 'Download Resume',
          secondary_cta_url: `/api/resumes/download/${saved.id}`,
          badge_text: saved.badge_text,
          terminal_lines: [
            { label: 'DOMAIN', val: saved.name },
            { label: 'ROLE', val: saved.role_title },
            { label: 'STATUS', val: 'Active Specialization' },
          ],
        };
      }

      // Initialize default about if missing
      if (!data.aboutSections[saved.id]) {
        data.aboutSections[saved.id] = {
          domain_id: saved.id,
          role_subtitle: `${saved.role_title} delivering specialized high-impact solutions.`,
          bio: `Specializing in ${saved.name} and technical execution with a commitment to engineering rigor and scalable design.`,
          highlights: [
            `Engineered modern solutions within ${saved.name}`,
            'Designed high-performance architectures and secure endpoints',
            'Committed to data integrity, testing, and continuous deployment',
          ],
          focus_areas: [
            { title: 'Core Architecture', desc: `Architectures tailored for ${saved.name}` },
            { title: 'Performance & Scale', desc: 'Optimization and latency management' },
          ],
          stats: [
            { label: 'Specialization', val: saved.name.split(' ')[0] },
            { label: 'Domain Mode', val: 'Active' },
          ],
        };
      }

      // Initialize default resume mapping if missing
      if (!data.resumes[saved.id]) {
        data.resumes[saved.id] = {
          id: `res-${saved.id}`,
          domain_id: saved.id,
          title: `Subha Dhanusha — ${saved.role_title} Resume`,
          description: `Resume tailored for ${saved.role_title} opportunities`,
          file_url: `/resumes/Subha_Dhanusha_AI_ML_Resume.pdf`,
          file_name: `Subha_Dhanusha_${saved.id}_Resume.pdf`,
          is_active: true,
          download_count: 0,
        };
      }
    }
    return data;
  });

  // Direct Supabase sync using service_role admin client
  if (isSupabaseConfigured()) {
    try {
      const adminClient = getSupabaseAdmin();
      await adminClient.from('domains').upsert({
        id: saved.id,
        name: saved.name,
        slug: saved.slug,
        role_title: saved.role_title,
        tagline: saved.tagline,
        badge_text: saved.badge_text,
        accent_color: saved.accent_color,
        secondary_color: saved.secondary_color,
        theme_code: saved.theme_code,
        theme_config: saved.theme_config,
        is_active: saved.is_active,
        display_order: saved.display_order,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

      // Upsert hero section for new domain
      await adminClient.from('hero_sections').upsert({
        domain_id: saved.id,
        headline: `ARCHITECTING ${saved.name.toUpperCase()}`,
        subheadline: `${saved.role_title} × Systems Engineering`,
        description: saved.tagline,
        primary_cta_label: 'Explore Projects',
        primary_cta_url: '#projects',
        secondary_cta_label: 'Download Resume',
        secondary_cta_url: `/api/resumes/download/${saved.id}`,
        badge_text: saved.badge_text,
        terminal_lines: [
          { label: 'DOMAIN', val: saved.name },
          { label: 'ROLE', val: saved.role_title },
          { label: 'STATUS', val: 'Active Specialization' },
        ],
        updated_at: new Date().toISOString(),
      }, { onConflict: 'domain_id' });

      // Upsert about section for new domain
      await adminClient.from('about_sections').upsert({
        domain_id: saved.id,
        role_subtitle: `${saved.role_title} delivering specialized high-impact solutions.`,
        bio: `Specializing in ${saved.name} and technical execution with a commitment to engineering rigor and scalable design.`,
        highlights: [
          `Engineered modern solutions within ${saved.name}`,
          'Designed high-performance architectures and secure endpoints',
          'Committed to data integrity, testing, and continuous deployment',
        ],
        focus_areas: [
          { title: 'Core Architecture', desc: `Architectures tailored for ${saved.name}` },
          { title: 'Performance & Scale', desc: 'Optimization and latency management' },
        ],
        stats: [
          { label: 'Specialization', val: saved.name.split(' ')[0] },
          { label: 'Domain Mode', val: 'Active' },
        ],
        updated_at: new Date().toISOString(),
      }, { onConflict: 'domain_id' });

      // Upsert resume for new domain
      await adminClient.from('resumes').upsert({
        id: `res-${saved.id}`,
        domain_id: saved.id,
        title: `Subha Dhanusha — ${saved.role_title} Resume`,
        description: `Resume tailored for ${saved.role_title} opportunities`,
        file_url: `/resumes/Subha_Dhanusha_AI_ML_Resume.pdf`,
        file_name: `Subha_Dhanusha_${saved.id}_Resume.pdf`,
        is_active: true,
        download_count: 0,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'domain_id' });

    } catch (e) {
      console.warn('Supabase saveDomain error:', e);
    }
  }

  return saved;
}

export async function deleteDomain(id: string): Promise<boolean> {
  await mutatePortfolioData(data => {
    data.domains = data.domains.filter(d => d.id !== id);
    delete data.heroSections[id];
    delete data.aboutSections[id];
    delete data.resumes[id];
    return data;
  });

  if (isSupabaseConfigured()) {
    try {
      const adminClient = getSupabaseAdmin();
      await adminClient.from('domains').delete().eq('id', id);
      await adminClient.from('hero_sections').delete().eq('domain_id', id);
      await adminClient.from('about_sections').delete().eq('domain_id', id);
      await adminClient.from('resumes').delete().eq('domain_id', id);
    } catch (e) {
      console.warn('Supabase deleteDomain error:', e);
    }
  }

  return true;
}

export async function saveProject(project: Project): Promise<Project> {
  let saved: Project = { ...project };
  await mutatePortfolioData(data => {
    const index = data.projects.findIndex(p => p.id === project.id || p.slug === project.slug);
    if (index >= 0) {
      saved = { ...data.projects[index], ...project, updated_at: new Date().toISOString() };
      data.projects[index] = saved;
    } else {
      if (!saved.id) saved.id = 'proj-' + Date.now();
      saved.created_at = new Date().toISOString();
      saved.updated_at = new Date().toISOString();
      data.projects.push(saved);
    }
    return data;
  });
  return saved;
}

export async function deleteProject(id: string): Promise<boolean> {
  await mutatePortfolioData(data => {
    data.projects = data.projects.filter(p => p.id !== id);
    return data;
  });
  return true;
}

export async function saveExperience(exp: Experience): Promise<Experience> {
  let saved: Experience = { ...exp };
  await mutatePortfolioData(data => {
    const index = data.experiences.findIndex(e => e.id === exp.id);
    if (index >= 0) {
      saved = { ...data.experiences[index], ...exp };
      data.experiences[index] = saved;
    } else {
      if (!saved.id) saved.id = 'exp-' + Date.now();
      data.experiences.push(saved);
    }
    return data;
  });
  return saved;
}

export async function deleteExperience(id: string): Promise<boolean> {
  await mutatePortfolioData(data => {
    data.experiences = data.experiences.filter(e => e.id !== id);
    return data;
  });
  return true;
}

export async function saveSkill(skill: Skill): Promise<Skill> {
  let saved: Skill = { ...skill };
  await mutatePortfolioData(data => {
    const index = data.skills.findIndex(s => s.id === skill.id);
    if (index >= 0) {
      saved = { ...data.skills[index], ...skill };
      data.skills[index] = saved;
    } else {
      if (!saved.id) saved.id = 'skill-' + Date.now();
      data.skills.push(saved);
    }
    return data;
  });
  return saved;
}

export async function deleteSkill(id: string): Promise<boolean> {
  await mutatePortfolioData(data => {
    data.skills = data.skills.filter(s => s.id !== id);
    return data;
  });
  return true;
}

export async function saveCertification(cert: Certification): Promise<Certification> {
  let saved: Certification = { ...cert };
  await mutatePortfolioData(data => {
    const index = data.certifications.findIndex(c => c.id === cert.id);
    if (index >= 0) {
      saved = { ...data.certifications[index], ...cert };
      data.certifications[index] = saved;
    } else {
      if (!saved.id) saved.id = 'cert-' + Date.now();
      data.certifications.push(saved);
    }
    return data;
  });
  return saved;
}

export async function deleteCertification(id: string): Promise<boolean> {
  await mutatePortfolioData(data => {
    data.certifications = data.certifications.filter(c => c.id !== id);
    return data;
  });
  return true;
}

export async function saveAchievement(achievement: Achievement): Promise<Achievement> {
  let saved: Achievement = { ...achievement };
  await mutatePortfolioData(data => {
    const index = data.achievements.findIndex(a => a.id === achievement.id);
    if (index >= 0) {
      saved = { ...data.achievements[index], ...achievement };
      data.achievements[index] = saved;
    } else {
      if (!saved.id) saved.id = 'ach-' + Date.now();
      data.achievements.push(saved);
    }
    return data;
  });
  return saved;
}

export async function deleteAchievement(id: string): Promise<boolean> {
  await mutatePortfolioData(data => {
    data.achievements = data.achievements.filter(a => a.id !== id);
    return data;
  });
  return true;
}

export async function updateHeroSection(domainId: DomainId, hero: any): Promise<any> {
  await mutatePortfolioData(data => {
    data.heroSections[domainId] = {
      ...data.heroSections[domainId],
      ...hero,
      updated_at: new Date().toISOString(),
    };
    return data;
  });
  return hero;
}

export async function updateAboutSection(domainId: DomainId, about: any): Promise<any> {
  await mutatePortfolioData(data => {
    data.aboutSections[domainId] = {
      ...data.aboutSections[domainId],
      ...about,
      updated_at: new Date().toISOString(),
    };
    return data;
  });
  return about;
}

export async function updateResume(domainId: DomainId, resume: Partial<Resume>): Promise<Resume> {
  let updatedResume: Resume;
  await mutatePortfolioData(data => {
    const current = data.resumes[domainId] || {
      id: 'res-' + domainId,
      domain_id: domainId,
      title: 'Resume',
      description: '',
      file_url: '',
      file_name: '',
      is_active: true,
      download_count: 0,
    };
    updatedResume = {
      ...current,
      ...resume,
      updated_at: new Date().toISOString(),
    };
    data.resumes[domainId] = updatedResume;
    return data;
  });
  return updatedResume!;
}

export async function incrementResumeDownload(domainId: DomainId): Promise<number> {
  let count = 0;
  await mutatePortfolioData(data => {
    if (data.resumes[domainId]) {
      data.resumes[domainId].download_count = (data.resumes[domainId].download_count || 0) + 1;
      count = data.resumes[domainId].download_count;
    }
    return data;
  });
  return count;
}

export async function submitContactMessage(msg: Omit<ContactMessage, 'id' | 'is_read' | 'is_replied' | 'created_at'>): Promise<ContactMessage> {
  const newMsg: ContactMessage = {
    ...msg,
    id: 'msg-' + Date.now(),
    is_read: false,
    is_replied: false,
    created_at: new Date().toISOString(),
  };

  inMemoryMessages.unshift(newMsg);

  // If Supabase is active, insert to contact_messages using admin client
  if (isSupabaseConfigured()) {
    try {
      const adminClient = getSupabaseAdmin();
      const { data, error } = await adminClient.from('contact_messages').insert([{
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
        domain_context: msg.domain_context,
      }]).select();
      if (!error && data && data[0]) {
        return data[0] as ContactMessage;
      }
    } catch (e) {
      console.warn('Failed to insert message to Supabase:', e);
    }
  }

  return newMsg;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured()) {
    try {
      const adminClient = getSupabaseAdmin();
      const { data, error } = await adminClient.from('contact_messages').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as ContactMessage[];
      }
    } catch (e) {
      // fallback
    }
  }
  return inMemoryMessages;
}

export async function updateMessageStatus(id: string, updates: { is_read?: boolean; is_replied?: boolean }): Promise<boolean> {
  const index = inMemoryMessages.findIndex(m => m.id === id);
  if (index >= 0) {
    inMemoryMessages[index] = { ...inMemoryMessages[index], ...updates };
  }
  if (isSupabaseConfigured()) {
    try {
      const adminClient = getSupabaseAdmin();
      await adminClient.from('contact_messages').update(updates).eq('id', id);
    } catch (e) {}
  }
  return true;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  inMemoryMessages = inMemoryMessages.filter(m => m.id !== id);
  if (isSupabaseConfigured()) {
    try {
      const adminClient = getSupabaseAdmin();
      await adminClient.from('contact_messages').delete().eq('id', id);
    } catch (e) {}
  }
  return true;
}

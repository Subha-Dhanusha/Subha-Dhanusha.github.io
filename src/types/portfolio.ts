// ==============================================================================
// SUBHA DHANUSHA P - DIGITAL PORTFOLIO TYPES
// ==============================================================================

export type DomainId = 'ai-ml' | 'data-engineering' | 'data-analytics' | 'software' | (string & {});

export interface DomainTheme {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  bgDark: string;
  bgLight: string;
  code: string;
}

export interface Domain {
  id: DomainId;
  name: string;
  slug: string;
  role_title: string;
  tagline: string;
  badge_text: string;
  accent_color: string;
  secondary_color: string;
  theme_code: string;
  theme_config?: Record<string, any>;
  is_active: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  full_name: string;
  short_name: string;
  email: string;
  phone?: string;
  location?: string;
  current_education?: string;
  expected_graduation?: string;
  cgpa?: string;
  highest_gpa?: string;
  avatar_url?: string;
  github_url: string;
  linkedin_url: string;
  website_url?: string;
}

export interface TerminalLine {
  label: string;
  val: string;
}

export interface HeroSection {
  id?: string;
  domain_id: DomainId;
  headline: string;
  subheadline: string;
  description: string;
  primary_cta_label: string;
  primary_cta_url: string;
  secondary_cta_label: string;
  secondary_cta_url: string;
  badge_text?: string;
  terminal_lines?: TerminalLine[];
  updated_at?: string;
}

export interface FocusArea {
  title: string;
  desc: string;
}

export interface StatItem {
  label: string;
  val: string;
}

export interface AboutSection {
  id?: string;
  domain_id: DomainId;
  role_subtitle: string;
  bio: string;
  highlights: string[];
  focus_areas: FocusArea[];
  stats: StatItem[];
  updated_at?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ArchitectureStep {
  step: string;
  name: string;
  desc: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  problem_statement: string;
  solution_overview: string;
  architecture_details?: string;
  implementation_highlights: string[];
  key_results: string[];
  technologies: string[];
  metrics: ProjectMetric[];
  github_url?: string;
  live_url?: string;
  api_url?: string;
  thumbnail_url?: string;
  banner_url?: string;
  architecture_diagram_type?: string;
  architecture_steps?: ArchitectureStep[];
  interactive_type?: 'none' | 'ml-inference' | 'sql-pipeline' | 'financial-kpi' | 'evidence-chain';
  featured: boolean;
  display_order: number;
  status: 'draft' | 'published';
  domain_ids?: DomainId[];
  is_primary_for?: DomainId[];
  created_at?: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  work_type: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description?: string;
  responsibilities: string[];
  technologies: string[];
  display_order: number;
  domain_tailored?: Record<DomainId, {
    position?: string;
    responsibilities?: string[];
  }>;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Programming' | 'Machine Learning' | 'Data Engineering' | 'Data Analytics' | 'Databases' | 'Cloud' | 'Web' | 'Tools';
  proficiency: number;
  icon_name?: string;
  display_order: number;
  domain_ids?: DomainId[];
  created_at?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  university: string;
  start_date?: string;
  end_date: string;
  cgpa: string;
  highest_gpa?: string;
  class_xii?: string;
  location?: string;
  achievements: string[];
  display_order: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date?: string;
  credential_url?: string;
  credential_id?: string;
  display_order: number;
  domain_ids?: DomainId[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  organization?: string;
  date?: string;
  category?: string;
  display_order: number;
  domain_ids?: DomainId[];
}

export interface Resume {
  id: string;
  domain_id: DomainId;
  title: string;
  description: string;
  file_url: string;
  file_name: string;
  file_size?: string;
  is_active: boolean;
  download_count: number;
  updated_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  domain_context?: DomainId;
  is_read: boolean;
  is_replied: boolean;
  ip_address?: string;
  created_at: string;
}

export interface SiteSettings {
  site_title: string;
  author: string;
  description: string;
  contact_email: string;
  phone: string;
  location: string;
  available_for_hire: boolean;
  default_domain: DomainId;
  sound_effects_enabled: boolean;
  custom_cursor_enabled: boolean;
}

export interface FullPortfolioData {
  domains: Domain[];
  profile: Profile;
  heroSections: Record<DomainId, HeroSection>;
  aboutSections: Record<DomainId, AboutSection>;
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  resumes: Record<DomainId, Resume>;
  settings: SiteSettings;
}

-- ==============================================================================
-- SUBHA DHANUSHA P - DIGITAL PORTFOLIO
-- SUPABASE POSTGRESQL DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if re-running migration
DROP TABLE IF EXISTS domain_achievements CASCADE;
DROP TABLE IF EXISTS domain_certifications CASCADE;
DROP TABLE IF EXISTS domain_skills CASCADE;
DROP TABLE IF EXISTS domain_experiences CASCADE;
DROP TABLE IF EXISTS domain_projects CASCADE;
DROP TABLE IF EXISTS project_metrics CASCADE;
DROP TABLE IF EXISTS resumes CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS about_sections CASCADE;
DROP TABLE IF EXISTS hero_sections CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS domains CASCADE;

-- 1. DOMAINS TABLE
CREATE TABLE domains (
    id TEXT PRIMARY KEY, -- 'ai-ml', 'data-engineering', 'data-analytics', 'software'
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    role_title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    badge_text TEXT,
    accent_color TEXT NOT NULL DEFAULT '#06b6d4',
    secondary_color TEXT NOT NULL DEFAULT '#8b5cf6',
    theme_code TEXT NOT NULL DEFAULT 'aiml',
    theme_config JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. PROFILES TABLE
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL DEFAULT 'Subha Dhanusha P',
    short_name TEXT NOT NULL DEFAULT 'Subha Dhanusha',
    email TEXT NOT NULL DEFAULT 'sdsubi0610@gmail.com',
    phone TEXT DEFAULT '+91 7845114897',
    location TEXT DEFAULT 'Kovilpatti, Tamil Nadu, India',
    current_education TEXT DEFAULT 'B.Tech in Artificial Intelligence & Data Science, Anna University (Ramco Institute of Technology)',
    expected_graduation TEXT DEFAULT 'Expected May 2027',
    cgpa TEXT DEFAULT '8.28 / 10.0',
    highest_gpa TEXT DEFAULT '8.91 / 10.0',
    avatar_url TEXT DEFAULT '/assets/subha-avatar.svg',
    github_url TEXT DEFAULT 'https://github.com/Subha-Dhanusha',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/in/subha-dhanusha-b6b3ab291',
    website_url TEXT DEFAULT 'https://subha-dhanusha.github.io',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. HERO SECTIONS TABLE (Per-Domain Hero Content)
CREATE TABLE hero_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain_id TEXT NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
    headline TEXT NOT NULL,
    subheadline TEXT NOT NULL,
    description TEXT NOT NULL,
    primary_cta_label TEXT DEFAULT 'Explore My Work',
    primary_cta_url TEXT DEFAULT '#projects',
    secondary_cta_label TEXT DEFAULT 'Download Resume',
    secondary_cta_url TEXT DEFAULT '#resume',
    badge_text TEXT,
    terminal_lines JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(domain_id)
);

-- 4. ABOUT SECTIONS TABLE (Per-Domain About Content)
CREATE TABLE about_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain_id TEXT NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
    role_subtitle TEXT NOT NULL,
    bio TEXT NOT NULL,
    highlights JSONB DEFAULT '[]'::jsonb,
    focus_areas JSONB DEFAULT '[]'::jsonb,
    stats JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(domain_id)
);

-- 5. PROJECTS TABLE
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT,
    tagline TEXT,
    description TEXT NOT NULL,
    problem_statement TEXT,
    solution_overview TEXT,
    architecture_details TEXT,
    implementation_highlights TEXT[] DEFAULT '{}',
    key_results TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    metrics JSONB DEFAULT '[]'::jsonb,
    github_url TEXT,
    live_url TEXT,
    api_url TEXT,
    thumbnail_url TEXT,
    banner_url TEXT,
    architecture_diagram_type TEXT DEFAULT 'flow',
    architecture_steps JSONB DEFAULT '[]'::jsonb,
    interactive_type TEXT DEFAULT 'none', -- 'ml-inference', 'sql-pipeline', 'financial-kpi', 'evidence-chain'
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. DOMAIN PROJECTS (Many-to-Many Linking with order & primary flag)
CREATE TABLE domain_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain_id TEXT NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    UNIQUE(domain_id, project_id)
);

-- 7. EXPERIENCES TABLE
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    location TEXT,
    work_type TEXT DEFAULT 'Internship',
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    responsibilities TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. DOMAIN EXPERIENCES (Tailored experience description per domain)
CREATE TABLE domain_experiences (
    domain_id TEXT NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
    experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    tailored_position TEXT,
    tailored_responsibilities TEXT[] DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    PRIMARY KEY(domain_id, experience_id)
);

-- 9. SKILLS TABLE
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'Programming',
        'Machine Learning',
        'Data Engineering',
        'Data Analytics',
        'Databases',
        'Cloud',
        'Web',
        'Tools'
    )),
    proficiency INTEGER DEFAULT 90 CHECK (proficiency BETWEEN 0 AND 100),
    icon_name TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 10. DOMAIN SKILLS (Skills linked to specific domains)
CREATE TABLE domain_skills (
    domain_id TEXT NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    priority INTEGER DEFAULT 1,
    PRIMARY KEY(domain_id, skill_id)
);

-- 11. EDUCATION TABLE
CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    university TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT NOT NULL,
    cgpa TEXT NOT NULL,
    highest_gpa TEXT,
    class_xii TEXT,
    location TEXT,
    achievements TEXT[] DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. CERTIFICATIONS TABLE
CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT,
    credential_url TEXT,
    credential_id TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. DOMAIN CERTIFICATIONS
CREATE TABLE domain_certifications (
    domain_id TEXT NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
    certification_id UUID NOT NULL REFERENCES certifications(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    PRIMARY KEY(domain_id, certification_id)
);

-- 14. ACHIEVEMENTS TABLE
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    organization TEXT,
    date TEXT,
    category TEXT DEFAULT 'Award',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 15. DOMAIN ACHIEVEMENTS
CREATE TABLE domain_achievements (
    domain_id TEXT NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    PRIMARY KEY(domain_id, achievement_id)
);

-- 16. RESUMES TABLE (Per-Domain Resume System)
CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain_id TEXT NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size TEXT,
    is_active BOOLEAN DEFAULT true,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(domain_id)
);

-- 17. CONTACT MESSAGES TABLE
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    domain_context TEXT DEFAULT 'ai-ml',
    is_read BOOLEAN DEFAULT false,
    is_replied BOOLEAN DEFAULT false,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 18. SITE SETTINGS TABLE
CREATE TABLE site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ POLICIES (Anyone can read published content)
CREATE POLICY "Public domains are viewable by everyone" ON domains FOR SELECT USING (true);
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public hero sections are viewable by everyone" ON hero_sections FOR SELECT USING (true);
CREATE POLICY "Public about sections are viewable by everyone" ON about_sections FOR SELECT USING (true);
CREATE POLICY "Published projects are viewable by everyone" ON projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public domain_projects viewable by everyone" ON domain_projects FOR SELECT USING (true);
CREATE POLICY "Public experiences are viewable by everyone" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public domain_experiences viewable by everyone" ON domain_experiences FOR SELECT USING (true);
CREATE POLICY "Public skills are viewable by everyone" ON skills FOR SELECT USING (true);
CREATE POLICY "Public domain_skills viewable by everyone" ON domain_skills FOR SELECT USING (true);
CREATE POLICY "Public education viewable by everyone" ON education FOR SELECT USING (true);
CREATE POLICY "Public certifications viewable by everyone" ON certifications FOR SELECT USING (true);
CREATE POLICY "Public domain_certifications viewable by everyone" ON domain_certifications FOR SELECT USING (true);
CREATE POLICY "Public achievements viewable by everyone" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public domain_achievements viewable by everyone" ON domain_achievements FOR SELECT USING (true);
CREATE POLICY "Active resumes viewable by everyone" ON resumes FOR SELECT USING (is_active = true);
CREATE POLICY "Public site_settings viewable by everyone" ON site_settings FOR SELECT USING (true);

-- 2. PUBLIC INSERT POLICIES (Contact Form)
CREATE POLICY "Anyone can submit a contact message" ON contact_messages FOR INSERT WITH CHECK (true);

-- 3. ADMIN POLICIES (Authenticated users have full CRUD)
CREATE POLICY "Admins have full access to domains" ON domains FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to profiles" ON profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to hero_sections" ON hero_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to about_sections" ON about_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to domain_projects" ON domain_projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to experiences" ON experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to domain_experiences" ON domain_experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to skills" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to domain_skills" ON domain_skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to education" ON education FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to certifications" ON certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to domain_certifications" ON domain_certifications FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to achievements" ON achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to domain_achievements" ON domain_achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to resumes" ON resumes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to contact_messages" ON contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admins have full access to site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

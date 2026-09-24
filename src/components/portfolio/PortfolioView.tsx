'use client';

import React, { useState, useEffect } from 'react';
import { FullPortfolioData, DomainId } from '@/types/portfolio';
import { useDomain } from '@/context/DomainContext';
import { fetchLiveClientPortfolio } from '@/lib/data/client-portfolio';
import Navbar from '@/components/ui/Navbar';
import DomainSwitcher from '@/components/ui/DomainSwitcher';
import Hero from '@/components/ui/Hero';
import About from '@/components/ui/About';
import ProjectGrid from '@/components/ui/ProjectGrid';
import ExperienceTimeline from '@/components/ui/ExperienceTimeline';
import SkillsGrid from '@/components/ui/SkillsGrid';
import EducationSection from '@/components/ui/EducationSection';
import CertificationsSection from '@/components/ui/CertificationsSection';
import AchievementsSection from '@/components/ui/AchievementsSection';
import ResumeSection from '@/components/ui/ResumeSection';
import ContactSection from '@/components/ui/ContactSection';
import Footer from '@/components/ui/Footer';

interface PortfolioViewProps {
  initialData: FullPortfolioData;
}

export default function PortfolioView({ initialData }: PortfolioViewProps) {
  const { currentDomain, updateDomains } = useDomain();
  const [data, setData] = useState<FullPortfolioData>(initialData);

  useEffect(() => {
    fetchLiveClientPortfolio(initialData).then((live) => {
      setData(live);
      if (live.domains && live.domains.length > 0) {
        updateDomains(live.domains);
      }
    });

    const handleUpdate = () => {
      fetchLiveClientPortfolio(initialData).then((live) => setData(live));
    };

    window.addEventListener('portfolio_data_updated', handleUpdate);
    return () => window.removeEventListener('portfolio_data_updated', handleUpdate);
  }, [initialData, updateDomains]);

  // Dynamically resolve active domain content
  const activeHero = data.heroSections[currentDomain] || data.heroSections['ai-ml'] || initialData.heroSections['ai-ml'];
  const activeAbout = data.aboutSections[currentDomain] || data.aboutSections['ai-ml'] || initialData.aboutSections['ai-ml'];
  const activeResume = data.resumes[currentDomain] || data.resumes['ai-ml'] || initialData.resumes['ai-ml'];

  // Filter & sort projects for current domain
  const domainProjects = (data.projects || initialData.projects).filter(p => {
    if (p.status !== 'published') return false;
    return !p.domain_ids || p.domain_ids.includes(currentDomain);
  }).sort((a, b) => {
    const aPrimary = a.is_primary_for?.includes(currentDomain) ? 1 : 0;
    const bPrimary = b.is_primary_for?.includes(currentDomain) ? 1 : 0;
    if (aPrimary !== bPrimary) return bPrimary - aPrimary;
    return a.display_order - b.display_order;
  });

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <DomainSwitcher />
      
      <main className="flex-1">
        <Hero
          hero={activeHero}
          profile={data.profile || initialData.profile}
          resumeUrl={activeResume?.file_url || '/resumes/Subha_Dhanusha_AI_ML_Resume.pdf'}
        />

        <About
          about={activeAbout}
          profile={data.profile || initialData.profile}
        />

        <ProjectGrid
          projects={domainProjects}
        />

        <ExperienceTimeline
          experiences={data.experiences || initialData.experiences}
        />

        <SkillsGrid
          skills={data.skills || initialData.skills}
        />

        <EducationSection
          education={data.education || initialData.education}
        />

        <CertificationsSection
          certifications={data.certifications || initialData.certifications}
        />

        <AchievementsSection
          achievements={data.achievements || initialData.achievements}
        />

        <ResumeSection
          resumes={data.resumes || initialData.resumes}
        />

        <ContactSection
          profile={data.profile || initialData.profile}
        />
      </main>

      <Footer />
    </div>
  );
}

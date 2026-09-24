import React from 'react';
import { Metadata } from 'next';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import Navbar from '@/components/ui/Navbar';
import DomainSwitcher from '@/components/ui/DomainSwitcher';
import About from '@/components/ui/About';
import SkillsGrid from '@/components/ui/SkillsGrid';
import EducationSection from '@/components/ui/EducationSection';
import AchievementsSection from '@/components/ui/AchievementsSection';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'About Subha Dhanusha P — Engineering Profile & Academic Honors',
  description: 'Learn more about Subha Dhanusha P, AI & Data engineering student at Anna University / Ramco Institute of Technology, 3x department topper, and Neoteric AI Association Secretary.',
};

export default async function StandaloneAboutPage() {
  const data = await getPortfolioData();
  const defaultAbout = data.aboutSections['ai-ml'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <DomainSwitcher />
      <main className="flex-1 pt-12 space-y-12">
        <About about={defaultAbout} profile={data.profile} />
        <SkillsGrid skills={data.skills} />
        <EducationSection education={data.education} />
        <AchievementsSection achievements={data.achievements} />
      </main>
      <Footer />
    </div>
  );
}

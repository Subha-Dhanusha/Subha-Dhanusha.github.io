import React from 'react';
import { Metadata } from 'next';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import Navbar from '@/components/ui/Navbar';
import DomainSwitcher from '@/components/ui/DomainSwitcher';
import ProjectGrid from '@/components/ui/ProjectGrid';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Engineering Projects & Case Studies — Subha Dhanusha P',
  description: 'Explore the full portfolio of engineering systems built by Subha Dhanusha P, including MediRisk AI, Stock Market Fundamental Analysis, and Network Forensics.',
};

export default async function AllProjectsPage() {
  const data = await getPortfolioData();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <DomainSwitcher />
      <main className="flex-1 pt-12">
        <ProjectGrid projects={data.projects} />
      </main>
      <Footer />
    </div>
  );
}

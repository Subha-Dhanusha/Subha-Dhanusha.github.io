import React from 'react';
import { Metadata } from 'next';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import Navbar from '@/components/ui/Navbar';
import DomainSwitcher from '@/components/ui/DomainSwitcher';
import ContactSection from '@/components/ui/ContactSection';
import Footer from '@/components/ui/Footer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact Subha Dhanusha P — Recruitment & Engineering Inquiries',
  description: 'Initiate a conversation with Subha Dhanusha P regarding AI/ML, Cloud Data Engineering, or Software development roles.',
};

export default async function StandaloneContactPage() {
  const data = await getPortfolioData();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <DomainSwitcher />
      <main className="flex-1 pt-12">
        <ContactSection profile={data.profile} />
      </main>
      <Footer />
    </div>
  );
}

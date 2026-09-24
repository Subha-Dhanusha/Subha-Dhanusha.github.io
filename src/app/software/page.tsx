import React from 'react';
import { Metadata } from 'next';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import DomainRouteView from '@/components/portfolio/DomainRouteView';

export const metadata: Metadata = {
  title: 'Subha Dhanusha P — AI & Data Software Engineer | Full-Stack Systems & APIs',
  description: 'Software Engineering portfolio of Subha Dhanusha P. Network Forensic Investigation System, court-admissible chain-of-custody tracking, Python Flask REST APIs, and full-stack enterprise portals.',
  keywords: ['Software Engineer', 'Full Stack Development', 'Python', 'Flask', 'Network Forensics', 'REST APIs', 'MySQL', 'Subha Dhanusha'],
};

export default async function SoftwarePage() {
  const data = await getPortfolioData();
  return <DomainRouteView initialData={data} domainId="software" />;
}

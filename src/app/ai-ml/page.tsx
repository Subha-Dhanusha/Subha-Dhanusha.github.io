import React from 'react';
import { Metadata } from 'next';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import DomainRouteView from '@/components/portfolio/DomainRouteView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Subha Dhanusha P — AI/ML Engineer | Predictive Modeling & Real-Time Inference',
  description: 'AI & Machine Learning portfolio of Subha Dhanusha P. Featuring MediRisk AI (87% diagnostic accuracy, 768 records), Scikit-learn feature pipelines, and Flask inference endpoints.',
  keywords: ['AI Engineer', 'Machine Learning', 'MediRisk AI', 'Scikit-learn', 'Predictive Modeling', 'Flask API', 'Subha Dhanusha'],
};

export default async function AiMlPage() {
  const data = await getPortfolioData();
  return <DomainRouteView initialData={data} domainId="ai-ml" />;
}

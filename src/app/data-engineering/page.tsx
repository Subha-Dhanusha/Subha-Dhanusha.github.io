import React from 'react';
import { Metadata } from 'next';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import DomainRouteView from '@/components/portfolio/DomainRouteView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Subha Dhanusha P — Cloud Data Engineer | Dimensional Lakehouses & ETL Pipelines',
  description: 'Cloud Data Engineering portfolio of Subha Dhanusha P. Multi-tier data pipelines, Star Schema dimensional modeling, SQL window functions, and financial data processing.',
  keywords: ['Cloud Data Engineer', 'ETL Pipelines', 'Star Schema', 'Dimensional Modeling', 'PySpark', 'SQL Views', 'Subha Dhanusha'],
};

export default async function DataEngineeringPage() {
  const data = await getPortfolioData();
  return <DomainRouteView initialData={data} domainId="data-engineering" />;
}

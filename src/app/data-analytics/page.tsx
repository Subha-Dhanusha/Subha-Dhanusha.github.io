import React from 'react';
import { Metadata } from 'next';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import DomainRouteView from '@/components/portfolio/DomainRouteView';

export const metadata: Metadata = {
  title: 'Subha Dhanusha P — Financial Data Analyst | Equity Valuation & Power BI Dashboards',
  description: 'Financial Analytics & Business Intelligence portfolio of Subha Dhanusha P. BlueStock FinTech internship, financial statement analysis, P/E, EPS, ROE, D/E modeling, and Power BI reporting.',
  keywords: ['Financial Data Analyst', 'Equity Research', 'Power BI', 'Valuation Metrics', 'SQL Analytics', 'BlueStock FinTech', 'Subha Dhanusha'],
};

export default async function DataAnalyticsPage() {
  const data = await getPortfolioData();
  return <DomainRouteView initialData={data} domainId="data-analytics" />;
}

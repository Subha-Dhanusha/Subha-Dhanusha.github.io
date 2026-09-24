import React from 'react';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import PortfolioView from '@/components/portfolio/PortfolioView';


export default async function HomePage() {
  const data = await getPortfolioData();
  return <PortfolioView initialData={data} />;
}

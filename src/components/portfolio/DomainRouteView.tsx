'use client';

import React, { useEffect } from 'react';
import { FullPortfolioData, DomainId } from '@/types/portfolio';
import { useDomain } from '@/context/DomainContext';
import PortfolioView from './PortfolioView';

interface DomainRouteProps {
  initialData: FullPortfolioData;
  domainId: DomainId;
}

export default function DomainRouteView({ initialData, domainId }: DomainRouteProps) {
  const { setDomain, currentDomain } = useDomain();

  useEffect(() => {
    if (currentDomain !== domainId) {
      setDomain(domainId);
    }
  }, [domainId]);

  return <PortfolioView initialData={initialData} />;
}

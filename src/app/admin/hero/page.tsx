import React from 'react';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminHeroManager from '@/components/admin/AdminHeroManager';

export const dynamic = 'force-dynamic';

export default async function AdminHeroPage() {
  const data = await getPortfolioData();

  return (
    <div>
      <AdminHeader
        title="Hero Section Configurations"
        description="Edit headline typography, role subtitles, terminal outputs, and CTAs per domain."
      />
      <AdminHeroManager initialHeroes={data.heroSections} />
    </div>
  );
}

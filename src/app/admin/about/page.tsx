import React from 'react';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminAboutManager from '@/components/admin/AdminAboutManager';

export default async function AdminAboutPage() {
  const data = await getPortfolioData();

  return (
    <div>
      <AdminHeader
        title="About Sections & Narrative"
        description="Craft domain-specific professional biographies, engineering pillars, and impact statistics."
      />
      <AdminAboutManager initialAbouts={data.aboutSections} />
    </div>
  );
}

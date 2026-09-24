import React from 'react';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminExperienceManager from '@/components/admin/AdminExperienceManager';

export const dynamic = 'force-dynamic';

export default async function AdminExperiencePage() {
  const data = await getPortfolioData();

  return (
    <div>
      <AdminHeader
        title="Experience & Internships"
        description="Manage company roles, timelines, and domain-tailored responsibilities."
      />
      <AdminExperienceManager initialExperiences={data.experiences} />
    </div>
  );
}

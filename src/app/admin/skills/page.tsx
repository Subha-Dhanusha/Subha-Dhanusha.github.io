import React from 'react';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSkillsManager from '@/components/admin/AdminSkillsManager';

export default async function AdminSkillsPage() {
  const data = await getPortfolioData();

  return (
    <div>
      <AdminHeader
        title="Technical Skills & Proficiencies"
        description="Configure skill categories, proficiencies, and domain priorities."
      />
      <AdminSkillsManager initialSkills={data.skills} />
    </div>
  );
}

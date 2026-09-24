import React from 'react';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminAchievementsManager from '@/components/admin/AdminAchievementsManager';

export default async function AdminAchievementsPage() {
  const data = await getPortfolioData();

  return (
    <div>
      <AdminHeader
        title="Achievements & Leadership"
        description="Manage debugging contest awards, department topper honors, and association leadership."
      />
      <AdminAchievementsManager initialAchievements={data.achievements} />
    </div>
  );
}

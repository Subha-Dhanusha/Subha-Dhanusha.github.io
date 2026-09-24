import React from 'react';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminEducationManager from '@/components/admin/AdminEducationManager';

export default async function AdminEducationPage() {
  const data = await getPortfolioData();

  return (
    <div>
      <AdminHeader
        title="Education & Academic Honors"
        description="Edit Anna University / RIT degree credentials, CGPA scores, and honors."
      />
      <AdminEducationManager initialEducation={data.education} />
    </div>
  );
}

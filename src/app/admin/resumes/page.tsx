import React from 'react';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminResumeManager from '@/components/admin/AdminResumeManager';

export default async function AdminResumesPage() {
  const data = await getPortfolioData();

  return (
    <div>
      <AdminHeader
        title="Resume Documents Management"
        description="Configure and verify the 4 specialized PDF documents associated with each professional domain."
      />
      <AdminResumeManager initialResumes={data.resumes} />
    </div>
  );
}

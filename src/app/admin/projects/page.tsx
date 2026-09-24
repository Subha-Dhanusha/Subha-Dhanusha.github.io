import React from 'react';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminProjectManager from '@/components/admin/AdminProjectManager';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const data = await getPortfolioData();

  return (
    <div>
      <AdminHeader
        title="Projects & Case Studies"
        description="Comprehensive CRUD management for engineering case studies, architectures, and metrics."
      />
      <AdminProjectManager initialProjects={data.projects} />
    </div>
  );
}

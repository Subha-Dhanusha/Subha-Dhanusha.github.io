import React from 'react';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminDomainManager from '@/components/admin/AdminDomainManager';

export default async function AdminDomainsPage() {
  const data = await getPortfolioData();

  return (
    <div>
      <AdminHeader
        title="Domain Identities & Themes"
        description="Configure the 4 specialized lenses, branding palettes, and positioning identities."
      />
      <AdminDomainManager initialDomains={data.domains} />
    </div>
  );
}

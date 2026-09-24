import React from 'react';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSettingsManager from '@/components/admin/AdminSettingsManager';

export default async function AdminSettingsPage() {
  const data = await getPortfolioData();

  return (
    <div>
      <AdminHeader
        title="Site Settings & Social Links"
        description="Configure global metadata, contact details, social links, and interactive sound preferences."
      />
      <AdminSettingsManager initialSettings={data.settings} profile={data.profile} />
    </div>
  );
}

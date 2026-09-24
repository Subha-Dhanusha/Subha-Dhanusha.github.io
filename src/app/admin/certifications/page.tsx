import React from 'react';
import { getPortfolioData } from '@/lib/data/portfolio-service';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminCertificationsManager from '@/components/admin/AdminCertificationsManager';

export const dynamic = 'force-dynamic';

export default async function AdminCertificationsPage() {
  const data = await getPortfolioData();

  return (
    <div>
      <AdminHeader
        title="Certifications & Accreditations"
        description="Manage professional credentials from Infosys, NASSCOM, IBM, and CISCO."
      />
      <AdminCertificationsManager initialCerts={data.certifications} />
    </div>
  );
}

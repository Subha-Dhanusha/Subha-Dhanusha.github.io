import React from 'react';
import { getPortfolioData, getContactMessages } from '@/lib/data/portfolio-service';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminDashboardOverview from '@/components/admin/AdminDashboardOverview';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const data = await getPortfolioData();
  const messages = await getContactMessages();

  return (
    <div>
      <AdminHeader
        title="Admin Control Center"
        description="Unified management dashboard for Subha Dhanusha's multi-domain portfolio platform."
      />
      <AdminDashboardOverview data={data} messages={messages} />
    </div>
  );
}

import React from 'react';
import { getContactMessages } from '@/lib/data/portfolio-service';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminMessagesManager from '@/components/admin/AdminMessagesManager';

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div>
      <AdminHeader
        title="Contact Messages & Inquiries"
        description="Review recruiter messages, toggle read/replied status, and initiate direct email replies."
      />
      <AdminMessagesManager initialMessages={messages} />
    </div>
  );
}

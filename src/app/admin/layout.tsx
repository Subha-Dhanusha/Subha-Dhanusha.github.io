'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAdminAuth();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, isLoginPage, router]);

  // If on login page, don't show admin sidebar/shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#040d1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500 animate-pulse flex items-center justify-center text-white font-bold text-sm">
            SD
          </div>
          <span className="text-xs font-mono text-cyan-400">
            Verifying Admin Credentials...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#080d19] text-slate-100 flex flex-col md:flex-row">
      <AdminSidebar unreadMessagesCount={0} />
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

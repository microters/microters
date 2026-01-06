// src/app/dashboard/page.jsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminDashboardView from '../components/AdminDashboard/AdminDasboardView';
import UserDashboardView from '../components/UserDashboard/UserDashboardView';

const DashboardLoading = () => (
  <div className="flex items-center justify-center h-[calc(100vh-200px)] w-full">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
      <p className="text-gray-500 animate-pulse">Loading your workspace...</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <DashboardLoading />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {session.user.role === 'ADMIN' 
        ? <AdminDashboardView user={session.user} /> 
        : <UserDashboardView user={session.user} />
      }
    </div>
  );
}
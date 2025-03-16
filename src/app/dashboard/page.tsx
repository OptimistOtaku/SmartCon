import React from 'react';
import Link from 'next/link';
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { DashboardHeader } from '../_components/dashboard-header';
import { DashboardSidebar } from '../_components/dashboard-sidebar';
import { DashboardOverview } from '../_components/dashboard-overview';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1b4b] to-[#111827] text-white">
      <DashboardHeader user={session.user} />
      
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-300 mt-2">
              Welcome back, {session.user.name}! Manage your rent agreements and documents.
            </p>
          </div>
          
          <DashboardOverview />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <Link 
                  href="/dashboard/create-agreement" 
                  className="block w-full py-2 px-4 bg-[hsl(280,100%,70%)] rounded-md text-center hover:bg-[hsl(280,100%,60%)] transition"
                >
                  Create New Agreement
                </Link>
                <Link 
                  href="/dashboard/scan-qr" 
                  className="block w-full py-2 px-4 bg-white/20 rounded-md text-center hover:bg-white/30 transition"
                >
                  Scan QR Code
                </Link>
                <Link 
                  href="/dashboard/upload-document" 
                  className="block w-full py-2 px-4 bg-white/20 rounded-md text-center hover:bg-white/30 transition"
                >
                  Upload Document
                </Link>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="font-medium">Agreement Created</p>
                  <p className="text-sm text-gray-300">123 Main St. Apartment - 2 hours ago</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-medium">Document Verified</p>
                  <p className="text-sm text-gray-300">ID Verification - 1 day ago</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className="font-medium">Payment Received</p>
                  <p className="text-sm text-gray-300">Monthly Rent - 3 days ago</p>
                </div>
              </div>
              <Link 
                href="/dashboard/activity" 
                className="block mt-4 text-sm text-[hsl(280,100%,70%)] hover:underline"
              >
                View all activity →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 
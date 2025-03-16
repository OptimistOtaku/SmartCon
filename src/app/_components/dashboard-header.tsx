import React from 'react';
import Link from 'next/link';
import { type Session } from 'next-auth';

interface DashboardHeaderProps {
  user: Session['user'];
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  return (
    <header className="bg-black/30 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center">
          <span className="text-2xl font-bold">Smart<span className="text-[hsl(280,100%,70%)]">Con</span></span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 hover:bg-white/20 transition">
              <div className="w-8 h-8 rounded-full bg-[hsl(280,100%,70%)] flex items-center justify-center text-white font-bold">
                {user.name?.[0] ?? 'U'}
              </div>
              <span>{user.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">
                Profile Settings
              </Link>
              <Link href="/dashboard/wallet" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">
                Wallet
              </Link>
              <div className="border-t border-gray-800 my-1"></div>
              <Link href="/api/auth/signout" className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-800">
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 
import React from 'react';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Smart<span className="text-[hsl(280,100%,70%)]">Con</span>
      </h1>
      <p className="mt-6 text-xl max-w-2xl">
        AI-powered blockchain-based rent agreements with QR code verification.
        Secure, transparent, and efficient property rental management.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/dashboard"
          className="rounded-full bg-[hsl(280,100%,70%)] px-8 py-3 font-semibold text-white no-underline transition hover:bg-[hsl(280,100%,60%)]"
        >
          Get Started
        </Link>
        <Link
          href="#how-it-works"
          className="rounded-full bg-white/10 px-8 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        >
          Learn More
        </Link>
      </div>
      <div className="mt-16 flex justify-center">
        <div className="relative w-full max-w-4xl">
          <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[hsl(280,100%,70%)] to-[hsl(220,100%,70%)] opacity-75 blur"></div>
          <div className="relative rounded-lg bg-black/80 p-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold text-white">Secure Rent Agreements</h3>
                <p className="mt-2 text-gray-300">
                  Create, sign, and verify rental agreements using blockchain technology and AI-powered document verification.
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
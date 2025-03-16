"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateAgreementPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    propertyAddress: '',
    propertyDescription: '',
    rentAmount: '',
    securityDeposit: '',
    leaseStartDate: '',
    leaseDuration: '12',
    tenantEmail: '',
    tenantWalletAddress: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // In a real app, this would call your API to create the agreement
      // For demo purposes, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('Agreement created successfully! A QR code has been generated for verification.');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/dashboard/agreements');
      }, 2000);
    } catch (err) {
      setError('Failed to create agreement. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1b4b] to-[#111827] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/dashboard" className="text-gray-300 hover:text-white mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold">Create New Rent Agreement</h1>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 border border-green-500 text-white px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <div className="bg-white/10 rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Property Address</label>
                <input
                  type="text"
                  name="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rent Amount (ETH)</label>
                <input
                  type="text"
                  name="rentAmount"
                  value={formData.rentAmount}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Security Deposit (ETH)</label>
                <input
                  type="text"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Lease Start Date</label>
                <input
                  type="date"
                  name="leaseStartDate"
                  value={formData.leaseStartDate}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Lease Duration (months)</label>
                <select
                  name="leaseDuration"
                  value={formData.leaseDuration}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  required
                >
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tenant Email</label>
                <input
                  type="email"
                  name="tenantEmail"
                  value={formData.tenantEmail}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tenant Wallet Address</label>
                <input
                  type="text"
                  name="tenantWalletAddress"
                  value={formData.tenantWalletAddress}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Property Description</label>
                <textarea
                  name="propertyDescription"
                  value={formData.propertyDescription}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white h-32"
                  required
                ></textarea>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Link
                href="/dashboard"
                className="bg-white/10 text-white px-6 py-2 rounded-md mr-4 hover:bg-white/20 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-[hsl(280,100%,70%)] text-white px-6 py-2 rounded-md hover:bg-[hsl(280,100%,60%)] transition"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Agreement'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
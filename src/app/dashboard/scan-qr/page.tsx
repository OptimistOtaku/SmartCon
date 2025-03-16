"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function ScanQRPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
      
      // Reset states
      setError('');
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(droppedFile);
      
      // Reset states
      setError('');
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleScan = async () => {
    if (!file) {
      setError('Please select a QR code image first');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // In a real app, this would call your API to scan the QR code
      // For demo purposes, we'll just simulate a delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock result
      setResult({
        contract_address: "0x1234567890abcdef1234567890abcdef12345678",
        agreement_id: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        landlord: "0x9876543210abcdef9876543210abcdef98765432",
        tenant: "0xfedcba0987654321fedcba0987654321fedcba09",
        property_details: "123 Main St, Apt 4B, New York, NY 10001",
        rent_amount: "0.5 ETH",
        duration: "12 months",
        timestamp: "2023-03-15T12:00:00Z",
        is_active: true
      });
    } catch (err) {
      setError('Failed to scan QR code. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
          <h1 className="text-3xl font-bold">Scan QR Code</h1>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Upload QR Code</h2>
            
            <div 
              className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center cursor-pointer hover:border-white/50 transition"
              onClick={triggerFileInput}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              
              {preview ? (
                <img src={preview} alt="QR Code Preview" className="max-h-64 mx-auto" />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-4 text-white/70">Click to browse or drag and drop</p>
                  <p className="text-sm text-white/50 mt-2">Supports PNG, JPG, GIF</p>
                </>
              )}
            </div>
            
            <button
              onClick={handleScan}
              className="w-full mt-4 bg-[hsl(280,100%,70%)] text-white px-6 py-2 rounded-md hover:bg-[hsl(280,100%,60%)] transition"
              disabled={!file || isLoading}
            >
              {isLoading ? 'Scanning...' : 'Scan QR Code'}
            </button>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Scan Result</h2>
            
            {result ? (
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-[hsl(280,100%,70%)]">Agreement Details</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Property:</span>
                      <span className="text-white">{result.property_details}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rent Amount:</span>
                      <span className="text-white">{result.rent_amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{result.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`${result.is_active ? 'text-green-400' : 'text-red-400'}`}>
                        {result.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-[hsl(280,100%,70%)]">Blockchain Info</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-gray-400">Contract Address:</span>
                      <div className="text-white break-all text-sm mt-1">{result.contract_address}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Agreement ID:</span>
                      <div className="text-white break-all text-sm mt-1">{result.agreement_id}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Landlord:</span>
                      <div className="text-white break-all text-sm mt-1">{result.landlord}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Tenant:</span>
                      <div className="text-white break-all text-sm mt-1">{result.tenant}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Link
                    href={`/dashboard/agreements/${result.agreement_id}`}
                    className="bg-[hsl(280,100%,70%)] text-white px-6 py-2 rounded-md hover:bg-[hsl(280,100%,60%)] transition"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-white/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-4">Scan a QR code to see agreement details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import React from 'react';

interface AssetClass {
  name: string;
  allocation: number;
  amount: number;
  color: string;
}

interface InvestmentAllocationProps {
  title: string;
  allocationData?: {
    totalInvestment: number;
    assetClasses: AssetClass[];
    riskLevel: string;
    expectedReturn: number;
  };
}

const InvestmentAllocation: React.FC<InvestmentAllocationProps> = ({ title, allocationData }) => {
  // Placeholder data if none provided
  const data = allocationData || {
    totalInvestment: 500000,
    assetClasses: [
      { name: 'Equity', allocation: 60, amount: 300000, color: 'bg-black' },
      { name: 'Debt', allocation: 30, amount: 150000, color: 'bg-gray-700' },
      { name: 'Gold', allocation: 5, amount: 25000, color: 'bg-gray-500' },
      { name: 'Cash', allocation: 5, amount: 25000, color: 'bg-gray-300' }
    ],
    riskLevel: 'Moderate',
    expectedReturn: 12
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium tracking-wide text-black mb-4">{title}</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600">Total Investment</span>
          <span className="text-sm font-bold text-black">₹{data.totalInvestment.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Risk Level</span>
          <span className="text-sm font-medium text-black">{data.riskLevel}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Expected Return</span>
          <span className="text-sm font-medium text-black">{data.expectedReturn}%</span>
        </div>
      </div>
      
      {/* Placeholder for pie chart */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 h-48 mb-4 flex items-center justify-center">
        <span className="text-gray-400">Asset Allocation Chart Placeholder</span>
      </div>
      
      <div className="space-y-3 mt-4">
        {data.assetClasses.map((asset, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${asset.color} mr-2`}></div>
                <span className="text-sm font-medium text-black">{asset.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-black">{asset.allocation}%</span>
                <span className="text-sm font-bold text-black">₹{asset.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full">
              <div 
                className={`${asset.color} h-1 rounded-full`} 
                style={{ width: `${asset.allocation}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentAllocation;
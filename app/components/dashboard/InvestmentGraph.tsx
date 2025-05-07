'use client';

import React from 'react';

interface InvestmentGraphProps {
  title: string;
  graphData?: {
    currentInvestment: number;
    projectedValue: number;
    timeHorizon: number;
    growthRate: number;
    monthlyContribution: number;
    yearlyData: {
      year: number;
      investmentValue: number;
      contributionValue: number;
      growthValue: number;
    }[];
  };
}

const InvestmentGraph: React.FC<InvestmentGraphProps> = ({ title, graphData }) => {
  // Placeholder data if none provided
  const data = graphData || {
    currentInvestment: 500000,
    projectedValue: 2800000,
    timeHorizon: 15,
    growthRate: 12,
    monthlyContribution: 15000,
    yearlyData: [
      { year: 1, investmentValue: 700000, contributionValue: 600000, growthValue: 100000 },
      { year: 5, investmentValue: 1500000, contributionValue: 1200000, growthValue: 300000 },
      { year: 10, investmentValue: 2100000, contributionValue: 1800000, growthValue: 300000 },
      { year: 15, investmentValue: 2800000, contributionValue: 2400000, growthValue: 400000 }
    ]
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium tracking-wide text-black mb-4">{title}</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Current Investment</span>
            <span className="text-lg font-bold text-black">₹{data.currentInvestment.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Projected Value</span>
            <span className="text-lg font-bold text-black">₹{data.projectedValue.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Time Horizon</span>
            <span className="text-md font-bold text-black">{data.timeHorizon} years</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Growth Rate</span>
            <span className="text-md font-bold text-black">{data.growthRate}%</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Monthly</span>
            <span className="text-md font-bold text-black">₹{data.monthlyContribution.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
      
      {/* Placeholder for chart */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 h-64 mb-4 flex items-center justify-center">
        <span className="text-gray-400">Investment Growth Chart Placeholder</span>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-black mb-2">Projected Growth</h3>
        <div className="space-y-2">
          {data.yearlyData.map((item, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <span className="text-xs font-medium text-black">Year {item.year}</span>
                <span className="text-xs font-bold text-black">₹{item.investmentValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full bg-gray-200 h-1 rounded-full mt-2">
                <div 
                  className="bg-black h-1 rounded-full" 
                  style={{ 
                    width: `${(item.investmentValue / data.projectedValue) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentGraph;